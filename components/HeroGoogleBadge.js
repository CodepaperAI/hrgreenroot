"use client";

import { useEffect, useState } from "react";

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
    <div className="hero-review-stars" aria-label={`${rating} out of 5 stars`}>
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

export function HeroGoogleBadge() {
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

  return (
    <aside className="hero-review-card reveal is-visible">
      <div className="hero-review-head">
        <div className="hero-review-google-mark">G</div>
        <div>
          <p className="hero-review-label">Google Reviews</p>
          <p className="hero-review-meta">
            {data.userRatingCount ? `${data.userRatingCount}+ ratings` : "Client feedback"}
          </p>
        </div>
      </div>

      <div className="hero-review-score-row">
        <div className="hero-review-score">{Number(data.rating || 5).toFixed(1)}</div>
        <div>
          <StarRow rating={data.rating} />
          <p className="hero-review-caption">Average rating</p>
        </div>
      </div>

      <p className="hero-review-quote">
        {data.reviews[0]?.text
          ? `"${data.reviews[0].text}"`
          : '"Reliable, professional, and consistently clean work."'}
      </p>

      <div className="hero-review-foot">
        <span>{data.source === "google" ? "Live Google review data" : "Source-backed feedback"}</span>
        {data.googleMapsUri ? (
          <a href={data.googleMapsUri} target="_blank" rel="noreferrer">
            View on Google
          </a>
        ) : null}
      </div>
    </aside>
  );
}
