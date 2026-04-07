import { NextResponse } from "next/server";
import { testimonials } from "@/lib/full-site-data";

const placeId = process.env.GOOGLE_PLACES_PLACE_ID;
const apiKey = process.env.GOOGLE_MAPS_API_KEY;

function fallbackPayload() {
  return {
    source: "fallback",
    placeName: "HR Greenroots Landscaping",
    rating: 5,
    userRatingCount: testimonials.length,
    googleMapsUri: null,
    reviews: testimonials.map((item, index) => ({
      id: `fallback-${index}`,
      authorName: item.source,
      rating: 5,
      relativePublishTimeDescription: "Source site",
      text: item.quote,
    })),
  };
}

export async function GET() {
  if (!placeId || !apiKey) {
    return NextResponse.json(fallbackPayload());
  }

  try {
    const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "displayName,rating,userRatingCount,reviews,googleMapsUri",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return NextResponse.json(fallbackPayload());
    }

    const data = await response.json();
    const reviews = Array.isArray(data.reviews) ? data.reviews.slice(0, 5) : [];

    return NextResponse.json({
      source: "google",
      placeName: data.displayName?.text ?? "HR Greenroots Landscaping",
      rating: data.rating ?? 5,
      userRatingCount: data.userRatingCount ?? reviews.length,
      googleMapsUri: data.googleMapsUri ?? null,
      reviews: reviews.map((review, index) => ({
        id: review.name ?? `google-${index}`,
        authorName: review.authorAttribution?.displayName ?? "Google reviewer",
        rating: review.rating ?? 5,
        relativePublishTimeDescription: review.relativePublishTimeDescription ?? "Google review",
        text: review.text?.text ?? review.originalText?.text ?? "",
      })),
    });
  } catch {
    return NextResponse.json(fallbackPayload());
  }
}
