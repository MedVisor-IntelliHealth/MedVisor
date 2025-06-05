// User types
export interface User {
  id: string
  name: string
  email: string
  role: "doctor" | "nurse" | "admin"
  avatar?: string
}

// Patient types
export interface Patient {
  id: string
  name: string
  age: number
  gender: string
  dob: string
  phone: string
  email: string
  address: string
  insurance: string
  policyNumber: string
  emergencyContact: string
  conditions: Condition[]
  allergies: Allergy[]
  medications: Medication[]
  labResults: LabResult[]
  visits: Visit[]
}

export interface Condition {
  name: string
  since: string
  status: string
  notes?: string
}

export interface Allergy {
  name: string
  severity: "Mild" | "Moderate" | "Severe"
  reaction: string
}

export interface Medication {
  name: string
  dosage: string
  frequency: string
  startDate: string
  endDate?: string
  notes?: string
}

export interface Prescription {
  id: string
  medication: string
  dosage: string
  frequency: string
  prescribedDate: string
  expiryDate: string
  status: "Active" | "Expired" | "Discontinued"
  prescribedBy: string
  pharmacy: string
  refills: number
  notes?: string
}

export interface LabResult {
  date: string
  type: string
  results: LabTestResult[]
}

export interface LabTestResult {
  name: string
  value: string
  unit: string
  range: string
  status: "Normal" | "High" | "Low"
}

export interface Visit {
  date: string
  reason: string
  notes: string
}

// AI Assistant types
export interface Message {
  role: "user" | "system"
  content: string
}

export interface Suggestion {
  text: string
  category: "general" | "appointments" | "medications" | "reminders"
}

// Condition suggestion types
export interface ConditionSuggestion {
  name: string
  evidence: Array<{
    test: string
    value: string
    status: string
  }>
  confidence: "High" | "Medium" | "Low"
}

// Medication recommendation types
export interface MedicationRecommendation {
  name: string
  dosage: string
  frequency: string
  notes: string
}

export type MedicationRecommendations = {
  [condition: string]: MedicationRecommendation[]
}
