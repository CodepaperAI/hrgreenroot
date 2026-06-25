// ---------------------------------------------------------------------------
// Cost-calculator pricing — EDIT THIS FILE TO TUNE THE ESTIMATES
// ---------------------------------------------------------------------------
// These are placeholder GTA/Ontario market ranges. Replace every number below
// with HR Greenroots' real rates. The on-page calculators (sod + fence) read
// straight from here, so changing a value here updates the website estimates.
//
// All prices are in CAD. "low"/"high" produce the estimate range shown to the
// visitor. Add-ons are flat per-unit costs. minCharge is the smallest total a
// job can be quoted at (covers mobilization / small-job overhead).
// ---------------------------------------------------------------------------

export const calculatorPricing = {
  currency: "CAD",

  sod: {
    // Installed price per square foot (supply + prep + labour).
    perSqFt: { low: 1.75, high: 3.25 },
    // Optional add-ons, charged per square foot.
    oldLawnRemoval: 0.75, // strip & dispose of existing turf
    topsoilGrading: 1.25, // fresh topsoil + grading before sod
    // Smallest total we'll quote a sod job at.
    minCharge: 600,
  },

  fence: {
    // Installed price per linear foot, by material (supply + labour).
    perLinearFt: {
      "wood-pressure-treated": { low: 35, high: 55, label: "Pressure-treated wood" },
      "chain-link": { low: 22, high: 38, label: "Chain link" },
      "vinyl": { low: 55, high: 90, label: "Vinyl / PVC" },
      "composite": { low: 70, high: 110, label: "Composite" },
    },
    // Height select multiplies the per-foot rate (taller fence = more material).
    heightMultiplier: {
      "4": 0.85, // 4 ft
      "6": 1.0, // 6 ft (baseline)
      "8": 1.25, // 8 ft
    },
    // Flat cost per gate added.
    gate: 250,
    // Optional add-on: remove & dispose old fence, charged per linear foot.
    oldFenceRemoval: 8,
    // Smallest total we'll quote a fence job at.
    minCharge: 800,
  },
};
