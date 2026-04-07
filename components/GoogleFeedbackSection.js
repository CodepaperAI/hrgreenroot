"use client";

import { useEffect, useState } from "react";

const STOCK_FEEDBACK_IMAGE = "https://images.pexels.com/photos/4920283/pexels-photo-4920283.jpeg?auto=compress&cs=tinysrgb&w=1200";

const initialData = {
  source: "loading",
  placeName: "HR Greenroots Landscaping",
  rating: 5,
  userRatingCount: 0,
  googleMapsUri: null,
  reviews: [],
};

function StarRow({ rating = 5 }) {
  const fullStars = Math.round(rating);

  return (
    <div className="google-feedback-stars" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <svg key={index} viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 3.8l2.5 5.1 5.6.8-4.1 4 1 5.6L12 16.8l-5 2.5 1-5.6-4.1-4 5.6-.8L12 3.8z"
            fill={index < fullStars ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  );
}

export function GoogleFeedbackSection() {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    let active = true;

    fetch("/api/google-reviews")
      .then((response) => response.json())
      .then((payload) => {
        if (active) {
          setData(payload);
        }
      })
      .catch(() => {
        if (active) {
          setData(initialData);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const leadReview = data.reviews[0];

  return (
    <section className="google-feedback section">
      <div className="google-feedback-shell">
        <div className="google-feedback-visual reveal">
          <div className="google-feedback-image-wrap">
            <img
              className="google-feedback-image"
              src={STOCK_FEEDBACK_IMAGE}
              alt="Professional landscaping maintenance"
              loading="lazy"
            />
          </div>
          <div className="google-feedback-chip">
            <div className="google-feedback-chip-logo">G</div>
            <div>
              <div className="google-feedback-chip-rating">
                <span>{Number(data.rating || 5).toFixed(1)}</span>
                <StarRow rating={data.rating} />
              </div>
              <p>{data.source === "google" ? "Google reviews" : "Client feedback"}</p>
            </div>
          </div>
        </div>

        <div className="google-feedback-copy">
          <div className="google-feedback-intro reveal">
            <p className="eyebrow">Client Feedback</p>
            <h2>Trusted by homeowners and property managers</h2>
            <p>
              Real review signals presented in a cleaner format, with live Google data when the
              Places API is connected.
            </p>
          </div>

          <div className="google-feedback-review reveal">
            <div className="google-feedback-review-head">
              <div>
                <p className="google-feedback-place">{data.placeName}</p>
                <p className="google-feedback-meta">
                  {data.userRatingCount ? `${data.userRatingCount} ratings` : "Client feedback"}
                </p>
              </div>
              <StarRow rating={leadReview?.rating ?? data.rating} />
            </div>

            <blockquote>
              {leadReview?.text
                ? `“${leadReview.text}”`
                : "“We take pride in our reliability, attention to detail, and customer satisfaction.”"}
            </blockquote>

            <div className="google-feedback-review-foot">
              <div>
                <p className="google-feedback-author">{leadReview?.authorName ?? "HR Greenroots"}</p>
                <p className="google-feedback-time">
                  {leadReview?.relativePublishTimeDescription ?? "Source site"}
                </p>
              </div>
              {data.googleMapsUri ? (
                <a href={data.googleMapsUri} target="_blank" rel="noreferrer">
                  View on Google
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
