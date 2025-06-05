import type { LabResult, Condition, MedicationRecommendations } from "../types"

/**
 * Analyzes lab results to suggest potential conditions
 */
export function analyzeLabResults(labResults: LabResult[]): Condition[] {
  const suggestedConditions: Condition[] = []

  // Flatten all lab test results
  const allResults = labResults.flatMap((lab) => lab.results)

  // Check for diabetes indicators
  const glucoseTests = allResults.filter(
    (result) => result.name.toLowerCase().includes("glucose") && result.status === "High",
  )

  const hba1cTests = allResults.filter(
    (result) => result.name.toLowerCase().includes("hba1c") && result.status === "High",
  )

  if (glucoseTests.length > 0 && hba1cTests.length > 0) {
    suggestedConditions.push({
      name: "Type 2 Diabetes",
      since: new Date().toISOString().split("T")[0],
      status: "Active",
    })
  }

  // Check for hyperlipidemia indicators
  const cholesterolTests = allResults.filter(
    (result) =>
      (result.name.toLowerCase().includes("cholesterol") || result.name.toLowerCase().includes("ldl")) &&
      result.status === "High",
  )

  if (cholesterolTests.length > 0) {
    suggestedConditions.push({
      name: "Hyperlipidemia",
      since: new Date().toISOString().split("T")[0],
      status: "Active",
    })
  }

  return suggestedConditions
}

/**
 * Checks for potential drug interactions
 */
export function checkDrugInteractions(medications: string[]): string[] {
  const interactions: string[] = []

  // This is a simplified version - in a real app, this would use a medical API
  if (medications.includes("Warfarin") && medications.includes("Aspirin")) {
    interactions.push("Warfarin + Aspirin: Increased risk of bleeding")
  }

  if (medications.includes("Lisinopril") && medications.includes("Spironolactone")) {
    interactions.push("Lisinopril + Spironolactone: Risk of hyperkalemia")
  }

  return interactions
}

/**
 * Get medication recommendations based on condition
 */
export function getMedicationRecommendations(condition: string): MedicationRecommendations {
  // This would typically come from an API or database
  const recommendations: MedicationRecommendations = {
    Hypertension: [
      { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", notes: "ACE inhibitor. Monitor for cough." },
      {
        name: "Amlodipine",
        dosage: "5mg",
        frequency: "Once daily",
        notes: "Calcium channel blocker. Monitor for edema.",
      },
      {
        name: "Hydrochlorothiazide",
        dosage: "25mg",
        frequency: "Once daily",
        notes: "Thiazide diuretic. Monitor electrolytes.",
      },
    ],
    "Type 2 Diabetes": [
      { name: "Metformin", dosage: "500mg", frequency: "Twice daily", notes: "First-line therapy. Take with meals." },
      { name: "Glipizide", dosage: "5mg", frequency: "Once daily", notes: "Sulfonylurea. Take before breakfast." },
      { name: "Empagliflozin", dosage: "10mg", frequency: "Once daily", notes: "SGLT2 inhibitor. Monitor for UTIs." },
    ],
    Hyperlipidemia: [
      {
        name: "Atorvastatin",
        dosage: "20mg",
        frequency: "Once daily at bedtime",
        notes: "Statin. Monitor liver function.",
      },
      { name: "Rosuvastatin", dosage: "10mg", frequency: "Once daily", notes: "Statin. Monitor for muscle pain." },
      { name: "Ezetimibe", dosage: "10mg", frequency: "Once daily", notes: "Cholesterol absorption inhibitor." },
    ],
  }

  return recommendations
}
