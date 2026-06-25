"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { calculatorPricing } from "@/lib/calculator-pricing";
import { contact } from "@/lib/full-site-data";
import styles from "./CostCalculator.module.css";

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

const VARIANT_LABEL = {
  sod: "Sod Installation Cost Calculator",
  fence: "Fence Installation Cost Calculator",
};

const toNumber = (value) => {
  const n = parseFloat(value);
  return Number.isFinite(n) && n > 0 ? n : 0;
};

const roundTo = (value, step = 50) => Math.round(value / step) * step;

export function CostCalculator({ variant }) {
  const router = useRouter();
  const config = calculatorPricing[variant];
  const currency = calculatorPricing.currency;

  const formatCurrency = useMemo(
    () =>
      new Intl.NumberFormat("en-CA", {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      }),
    [currency]
  );
  const money = (value) => formatCurrency.format(Math.max(0, Math.round(value)));

  // --- Sod inputs ---
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [oldLawnRemoval, setOldLawnRemoval] = useState(false);
  const [topsoilGrading, setTopsoilGrading] = useState(false);

  // --- Fence inputs ---
  const materialKeys = variant === "fence" ? Object.keys(config.perLinearFt) : [];
  const [fenceLength, setFenceLength] = useState("");
  const [material, setMaterial] = useState(materialKeys[0] ?? "");
  const [height, setHeight] = useState("6");
  const [gates, setGates] = useState("0");
  const [oldFenceRemoval, setOldFenceRemoval] = useState(false);

  // --- Lead capture ---
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  const estimate = useMemo(() => {
    // Round every line to the nearest $50, then sum the rounded lines so the
    // breakdown always adds up to the headline total (no off-by-rounding gaps).
    const flat = (label, amount) => {
      const v = roundTo(amount);
      return { label, low: v, high: v };
    };
    const finalize = (lines, minCharge, extra) => {
      let low = lines.reduce((sum, line) => sum + line.low, 0);
      let high = lines.reduce((sum, line) => sum + line.high, 0);
      const minApplied = low < minCharge;
      low = Math.max(low, minCharge);
      high = Math.max(high, minCharge);
      return { hasInput: true, lines, low, high, minApplied, ...extra };
    };

    if (variant === "sod") {
      const area = toNumber(length) * toNumber(width);
      if (area <= 0) return { hasInput: false, area: 0 };

      const lines = [
        {
          label: `Sod installation (${area.toLocaleString("en-CA")} sq ft)`,
          low: roundTo(area * config.perSqFt.low),
          high: roundTo(area * config.perSqFt.high),
        },
      ];
      if (oldLawnRemoval) lines.push(flat("Old lawn removal", area * config.oldLawnRemoval));
      if (topsoilGrading) lines.push(flat("Topsoil & grading", area * config.topsoilGrading));

      return finalize(lines, config.minCharge, { area });
    }

    // fence
    const linearFt = toNumber(fenceLength);
    if (linearFt <= 0 || !material) return { hasInput: false };

    const rate = config.perLinearFt[material];
    const mult = config.heightMultiplier[height] ?? 1;
    const gateCount = Math.max(0, Math.round(toNumber(gates)));

    const lines = [
      {
        label: `${rate.label} fence (${linearFt.toLocaleString("en-CA")} ft, ${height} ft high)`,
        low: roundTo(linearFt * rate.low * mult),
        high: roundTo(linearFt * rate.high * mult),
      },
    ];
    if (gateCount > 0) lines.push(flat(`Gates (${gateCount})`, gateCount * config.gate));
    if (oldFenceRemoval) lines.push(flat("Old fence removal", linearFt * config.oldFenceRemoval));

    return finalize(lines, config.minCharge, {
      rateLabel: rate.label,
      linearFt,
      gateCount,
    });
  }, [
    variant,
    length,
    width,
    oldLawnRemoval,
    topsoilGrading,
    fenceLength,
    material,
    height,
    gates,
    oldFenceRemoval,
    config,
  ]);

  function buildMessage(note) {
    const rangeText = `${money(estimate.low)} – ${money(estimate.high)} ${currency}`;
    const lines = [`SOURCE: ${VARIANT_LABEL[variant]}`, ""];

    if (variant === "sod") {
      lines.push(
        `Lawn area: ${estimate.area.toLocaleString("en-CA")} sq ft (${toNumber(length)} ft x ${toNumber(
          width
        )} ft)`,
        `Old lawn removal: ${oldLawnRemoval ? "Yes" : "No"}`,
        `Topsoil & grading: ${topsoilGrading ? "Yes" : "No"}`
      );
    } else {
      lines.push(
        `Fence length: ${estimate.linearFt.toLocaleString("en-CA")} linear ft`,
        `Material: ${estimate.rateLabel}`,
        `Height: ${height} ft`,
        `Gates: ${estimate.gateCount}`,
        `Old fence removal: ${oldFenceRemoval ? "Yes" : "No"}`
      );
    }

    lines.push(`Estimated range: ${rangeText}`, "", "--- Customer note ---", note?.trim() || "(none)");
    return lines.join("\n");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (status === "sending") return;

    const data = new FormData(event.currentTarget);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      address: data.get("address"),
      message: buildMessage(data.get("note")),
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

      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("event", "generate_lead", {
          event_category: "cost_calculator",
          event_label: variant,
          value: estimate.high,
          currency,
        });
      }

      setStatus("sent");
      setFeedback("Thanks - your estimate is on its way to our team. We'll be in touch shortly.");
      router.push("/thank-you");
    } catch {
      setStatus("error");
      setFeedback("Network issue - please try again or reach us by phone or WhatsApp.");
    }
  }

  const sending = status === "sending";

  return (
    <div className={`${styles.calculator} reveal`}>
      <div className={styles.controls}>
        {variant === "sod" ? (
          <>
            <div className={styles.row}>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Lawn length (ft)</span>
                <input
                  className={styles.input}
                  type="number"
                  min="0"
                  inputMode="decimal"
                  placeholder="e.g. 25"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                />
              </label>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Lawn width (ft)</span>
                <input
                  className={styles.input}
                  type="number"
                  min="0"
                  inputMode="decimal"
                  placeholder="e.g. 20"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                />
              </label>
            </div>

            <p className={styles.areaReadout}>
              Coverage area:{" "}
              <strong>
                {(toNumber(length) * toNumber(width)).toLocaleString("en-CA")} sq ft
              </strong>
            </p>

            <div className={styles.checks}>
              <label className={styles.check}>
                <input
                  type="checkbox"
                  checked={oldLawnRemoval}
                  onChange={(e) => setOldLawnRemoval(e.target.checked)}
                />
                <span>Remove &amp; dispose of old lawn</span>
              </label>
              <label className={styles.check}>
                <input
                  type="checkbox"
                  checked={topsoilGrading}
                  onChange={(e) => setTopsoilGrading(e.target.checked)}
                />
                <span>Fresh topsoil &amp; grading</span>
              </label>
            </div>
          </>
        ) : (
          <>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>Fence length (linear ft)</span>
              <input
                className={styles.input}
                type="number"
                min="0"
                inputMode="decimal"
                placeholder="e.g. 120"
                value={fenceLength}
                onChange={(e) => setFenceLength(e.target.value)}
              />
            </label>

            <div className={styles.row}>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Material</span>
                <select
                  className={styles.select}
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                >
                  {materialKeys.map((key) => (
                    <option key={key} value={key}>
                      {config.perLinearFt[key].label}
                    </option>
                  ))}
                </select>
              </label>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Height</span>
                <select
                  className={styles.select}
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                >
                  {Object.keys(config.heightMultiplier).map((h) => (
                    <option key={h} value={h}>
                      {h} ft
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className={styles.field}>
              <span className={styles.fieldLabel}>Number of gates</span>
              <input
                className={styles.input}
                type="number"
                min="0"
                step="1"
                inputMode="numeric"
                placeholder="0"
                value={gates}
                onChange={(e) => setGates(e.target.value)}
              />
            </label>

            <div className={styles.checks}>
              <label className={styles.check}>
                <input
                  type="checkbox"
                  checked={oldFenceRemoval}
                  onChange={(e) => setOldFenceRemoval(e.target.checked)}
                />
                <span>Remove &amp; dispose of old fence</span>
              </label>
            </div>
          </>
        )}
      </div>

      <div className={styles.result}>
        <p className={styles.resultLabel}>Estimated project cost</p>

        {estimate.hasInput ? (
          <>
            <p className={styles.range}>
              {money(estimate.low)} <span>–</span> {money(estimate.high)}
            </p>

            <ul className={styles.breakdown}>
              {estimate.lines.map((line) => (
                <li key={line.label} className={styles.breakdownRow}>
                  <span>{line.label}</span>
                  <strong>
                    {line.low === line.high
                      ? money(line.low)
                      : `${money(line.low)} – ${money(line.high)}`}
                  </strong>
                </li>
              ))}
              {estimate.minApplied ? (
                <li className={styles.breakdownRow}>
                  <span>Minimum job charge applied</span>
                  <strong>{money(estimate.low)}</strong>
                </li>
              ) : null}
            </ul>
          </>
        ) : (
          <p className={styles.rangePrompt}>
            {variant === "sod"
              ? "Enter your lawn dimensions to see an instant estimate."
              : "Enter your fence length to see an instant estimate."}
          </p>
        )}

        <p className={styles.disclaimer}>
          Ballpark estimate based on typical GTA pricing — your final quote is confirmed after a quick
          site visit.
        </p>

        {estimate.hasInput && !showForm ? (
          <button
            type="button"
            className={styles.primaryButton}
            onClick={() => setShowForm(true)}
          >
            <span>Get my exact quote</span>
            <ArrowIcon />
          </button>
        ) : null}

        {showForm ? (
          <form className={styles.quoteForm} onSubmit={handleSubmit} noValidate>
            <p className={styles.formIntro}>
              We&apos;ll send this estimate to our team and follow up with an exact quote.
            </p>
            <div className={styles.formGrid}>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Name</span>
                <input className={styles.input} name="name" type="text" placeholder="Your name" required autoComplete="name" />
              </label>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Email</span>
                <input className={styles.input} name="email" type="email" placeholder="Your email" required autoComplete="email" />
              </label>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Phone</span>
                <input
                  className={styles.input}
                  name="phone"
                  type="tel"
                  placeholder="Your phone number"
                  autoComplete="tel"
                  required
                  pattern="[0-9+()\-\s]{7,}"
                  title="Please enter a valid phone number (at least 7 digits)"
                />
              </label>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Project address</span>
                <input className={styles.input} name="address" type="text" placeholder="Project address" autoComplete="street-address" />
              </label>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Notes (optional)</span>
                <textarea
                  className={styles.input}
                  name="note"
                  rows="3"
                  placeholder="Anything else we should know about the project?"
                />
              </label>

              <button className={styles.primaryButton} type="submit" disabled={sending} aria-busy={sending}>
                <span>{sending ? "Sending..." : "Send my estimate"}</span>
                <ArrowIcon />
              </button>

              {feedback ? (
                <p
                  className={`${styles.feedback} ${status === "error" ? styles.feedbackError : ""}`}
                  role={status === "error" ? "alert" : "status"}
                  aria-live="polite"
                >
                  {feedback}
                </p>
              ) : null}

              <p className={styles.altContact}>
                Prefer to talk? Call <a href={contact.phoneHref}>{contact.phoneDisplay}</a>.
              </p>
            </div>
          </form>
        ) : null}
      </div>
    </div>
  );
}
