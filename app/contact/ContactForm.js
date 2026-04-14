"use client";

import { useState } from "react";
import styles from "../routes-theme.module.css";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6 12h12m-5-5 5 5-5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (status === "sending") return;

    const formEl = event.currentTarget;
    const data = new FormData(formEl);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      address: data.get("address"),
      message: data.get("message"),
    };

    setStatus("sending");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.ok) {
        setStatus("error");
        setFeedback(result.error || "Something went wrong. Please try again or call us directly.");
        return;
      }

      setStatus("sent");
      setFeedback("Thanks — your inquiry is on its way. We'll be in touch shortly.");
      formEl.reset();
    } catch {
      setStatus("error");
      setFeedback("Network issue — please try again or reach us by phone or WhatsApp.");
    }
  }

  const sending = status === "sending";

  return (
    <form className={`${styles.formPanel} reveal`} onSubmit={handleSubmit} noValidate>
      <div className={styles.formIntro}>
        <p className={styles.eyebrow}>Get In Touch</p>
        <h2>Request a free quote.</h2>
        <p>Tell us about your property, timing, and the result you want to achieve.</p>
      </div>

      <div className={styles.formGrid}>
        <label>
          <span>Name</span>
          <input name="name" type="text" placeholder="Your name" required autoComplete="name" />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" placeholder="Your email" required autoComplete="email" />
        </label>
        <label>
          <span>Phone</span>
          <input name="phone" type="tel" placeholder="Your phone number" autoComplete="tel" />
        </label>
        <label>
          <span>Address</span>
          <input name="address" type="text" placeholder="Project address" autoComplete="street-address" />
        </label>
        <label>
          <span>Project Details</span>
          <textarea
            name="message"
            rows="6"
            placeholder="Let us know the details of what you are looking for, and we'll contact you with a quote."
            required
          />
        </label>
        <button className={styles.primaryButton} type="submit" disabled={sending} aria-busy={sending}>
          <span>{sending ? "Sending…" : "Send Inquiry"}</span>
          <ArrowIcon />
        </button>

        {feedback ? (
          <p
            role={status === "error" ? "alert" : "status"}
            aria-live="polite"
            style={{
              margin: 0,
              padding: "0.85rem 1rem",
              borderRadius: "0.75rem",
              fontSize: "0.95rem",
              lineHeight: 1.5,
              background: status === "error" ? "rgba(178, 34, 34, 0.08)" : "rgba(43, 98, 42, 0.08)",
              color: status === "error" ? "#8a1f1f" : "#2b622a",
              border: `1px solid ${status === "error" ? "rgba(178, 34, 34, 0.25)" : "rgba(43, 98, 42, 0.25)"}`,
            }}
          >
            {feedback}
          </p>
        ) : null}
      </div>
    </form>
  );
}
