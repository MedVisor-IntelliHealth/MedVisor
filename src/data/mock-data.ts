import type { Patient, Prescription, User, Message, ConditionSuggestion } from "../types"

// Mock user data
export const currentUser: User = {
  id: "u1",
  name: "Dr. Michael Smith",
  email: "m.smith@hospital.org",
  role: "doctor",
}

// Mock patient data
export const patientData: Patient = {
  id: "P12345",
  name: "James Wilson",
  age: 45,
  gender: "Male",
  dob: "1978-08-12",
  phone: "(555) 123-4567",
  email: "james.wilson@example.com",
  address: "123 Main St, Anytown, CA 12345",
  insurance: "BlueCross BlueShield",
  policyNumber: "BC1234567",
  emergencyContact: "Mary Wilson (Wife) - (555) 987-6543",
  conditions: [
    { name: "Hypertension", since: "2018", status: "Active" },
    { name: "Type 2 Diabetes", since: "2020", status: "Active" },
    { name: "Hyperlipidemia", since: "2019", status: "Active" },
  ],
  allergies: [
    { name: "Penicillin", severity: "Severe", reaction: "Anaphylaxis" },
    { name: "Sulfa Drugs", severity: "Moderate", reaction: "Rash" },
    { name: "Peanuts", severity: "Mild", reaction: "Hives" },
  ],
  medications: [
    { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", startDate: "2018-09-15" },
    { name: "Metformin", dosage: "500mg", frequency: "Twice daily", startDate: "2020-03-10" },
    { name: "Atorvastatin", dosage: "20mg", frequency: "Once daily at bedtime", startDate: "2019-05-22" },
    { name: "Aspirin", dosage: "81mg", frequency: "Once daily", startDate: "2018-09-15" },
  ],
  labResults: [
    {
      date: "2023-05-15",
      type: "Comprehensive Metabolic Panel",
      results: [
        { name: "Glucose", value: "142", unit: "mg/dL", range: "70-99", status: "High" },
        { name: "Creatinine", value: "0.9", unit: "mg/dL", range: "0.6-1.2", status: "Normal" },
        { name: "Potassium", value: "4.2", unit: "mmol/L", range: "3.5-5.0", status: "Normal" },
        { name: "Sodium", value: "138", unit: "mmol/L", range: "135-145", status: "Normal" },
      ],
    },
    {
      date: "2023-03-10",
      type: "Lipid Panel",
      results: [
        { name: "Total Cholesterol", value: "210", unit: "mg/dL", range: "<200", status: "High" },
        { name: "LDL", value: "130", unit: "mg/dL", range: "<100", status: "High" },
        { name: "HDL", value: "45", unit: "mg/dL", range: ">40", status: "Normal" },
        { name: "Triglycerides", value: "175", unit: "mg/dL", range: "<150", status: "High" },
      ],
    },
    {
      date: "2023-01-20",
      type: "HbA1c",
      results: [{ name: "HbA1c", value: "7.2", unit: "%", range: "<5.7", status: "High" }],
    },
  ],
  visits: [
    {
      date: "2023-05-15",
      reason: "Follow-up for hypertension and diabetes",
      notes: "Patient reports compliance with medications. Blood pressure controlled. Glucose levels still elevated.",
    },
    {
      date: "2023-03-10",
      reason: "Routine check-up",
      notes: "Patient reports occasional headaches. Prescribed new cholesterol medication.",
    },
    {
      date: "2023-01-20",
      reason: "Diabetes management",
      notes: "Adjusted metformin dosage. Discussed diet and exercise plan.",
    },
  ],
}

// Mock prescription history data
export const prescriptionHistory: Prescription[] = [
  {
    id: "RX12345",
    medication: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    prescribedDate: "2023-09-15",
    expiryDate: "2024-03-15",
    status: "Active",
    prescribedBy: "Dr. Michael Smith",
    pharmacy: "City Pharmacy",
    refills: 2,
    notes: "Take with food in the morning.",
  },
  {
    id: "RX12346",
    medication: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    prescribedDate: "2023-08-10",
    expiryDate: "2024-02-10",
    status: "Active",
    prescribedBy: "Dr. Michael Smith",
    pharmacy: "City Pharmacy",
    refills: 3,
    notes: "Take with meals.",
  },
  {
    id: "RX12347",
    medication: "Atorvastatin",
    dosage: "20mg",
    frequency: "Once daily at bedtime",
    prescribedDate: "2023-07-22",
    expiryDate: "2024-01-22",
    status: "Active",
    prescribedBy: "Dr. Michael Smith",
    pharmacy: "City Pharmacy",
    refills: 2,
    notes: "Take at bedtime.",
  },
  {
    id: "RX12348",
    medication: "Hydrochlorothiazide",
    dosage: "25mg",
    frequency: "Once daily",
    prescribedDate: "2023-05-05",
    expiryDate: "2023-11-05",
    status: "Expired",
    prescribedBy: "Dr. Michael Smith",
    pharmacy: "City Pharmacy",
    refills: 0,
    notes: "Take in the morning.",
  },
  {
    id: "RX12349",
    medication: "Amlodipine",
    dosage: "5mg",
    frequency: "Once daily",
    prescribedDate: "2023-04-12",
    expiryDate: "2023-10-12",
    status: "Discontinued",
    prescribedBy: "Dr. Michael Smith",
    pharmacy: "City Pharmacy",
    refills: 0,
    notes: "Discontinued due to ankle swelling.",
  },
]

// Mock condition suggestions based on lab results
export const conditionSuggestions: ConditionSuggestion[] = [
  {
    name: "Type 2 Diabetes",
    evidence: [
      { test: "Glucose", value: "142 mg/dL", status: "High" },
      { test: "HbA1c", value: "7.2%", status: "High" },
    ],
    confidence: "High",
  },
  {
    name: "Hyperlipidemia",
    evidence: [
      { test: "Total Cholesterol", value: "210 mg/dL", status: "High" },
      { test: "LDL", value: "130 mg/dL", status: "High" },
      { test: "Triglycerides", value: "175 mg/dL", status: "High" },
    ],
    confidence: "High",
  },
  {
    name: "Metabolic Syndrome",
    evidence: [
      { test: "Glucose", value: "142 mg/dL", status: "High" },
      { test: "Triglycerides", value: "175 mg/dL", status: "High" },
    ],
    confidence: "Medium",
  },
]

// Sample patients list data
export const patientsList = [
  {
    id: "P12345",
    name: "James Wilson",
    age: 45,
    gender: "Male",
    lastVisit: "2023-05-15",
    condition: "Hypertension",
  },
  {
    id: "P12346",
    name: "Emma Davis",
    age: 32,
    gender: "Female",
    lastVisit: "2023-06-02",
    condition: "Diabetes Type 2",
  },
  {
    id: "P12347",
    name: "Robert Brown",
    age: 58,
    gender: "Male",
    lastVisit: "2023-05-28",
    condition: "Arthritis",
  },
  {
    id: "P12348",
    name: "Sarah Johnson",
    age: 29,
    gender: "Female",
    lastVisit: "2023-06-10",
    condition: "Asthma",
  },
  {
    id: "P12349",
    name: "Michael Thompson",
    age: 62,
    gender: "Male",
    lastVisit: "2023-05-20",
    condition: "Coronary Artery Disease",
  },
  {
    id: "P12350",
    name: "Lisa Anderson",
    age: 41,
    gender: "Female",
    lastVisit: "2023-06-05",
    condition: "Hypothyroidism",
  },
  {
    id: "P12351",
    name: "David Martinez",
    age: 37,
    gender: "Male",
    lastVisit: "2023-06-08",
    condition: "Anxiety Disorder",
  },
  {
    id: "P12352",
    name: "Jennifer Wilson",
    age: 54,
    gender: "Female",
    lastVisit: "2023-05-25",
    condition: "Osteoporosis",
  },
]

// AI Assistant suggestions
export const aiSuggestions = {
  general: [
    "What are the latest guidelines for hypertension treatment?",
    "Summarize recent research on diabetes management",
    "What are the common drug interactions with warfarin?",
    "What's the recommended dosage of amoxicillin for pediatric patients?",
  ],
  appointments: [
    "Schedule a follow-up appointment for James Wilson next week",
    "Reschedule Sarah Johnson's appointment from tomorrow to Friday",
    "Show me all appointments for next Monday",
    "Send appointment reminders to patients with visits tomorrow",
  ],
  medications: [
    "What are the side effects of Lisinopril?",
    "Check for interactions between Metformin and Atorvastatin",
    "What's the recommended dosage of Levothyroxine for a 45-year-old female?",
    "Generate a prescription for Amoxicillin 500mg",
  ],
  reminders: [
    "Remind me to review lab results for James Wilson tomorrow",
    "Set a reminder for the staff meeting on Friday at 2 PM",
    "Remind me to call the pharmacy about medication shortages",
    "Set a reminder to follow up with patients who missed appointments this week",
  ],
}

// AI Assistant mock responses
export const aiResponses = {
  general: {
    "What are the latest guidelines for hypertension treatment?":
      "According to the latest guidelines from the American College of Cardiology and American Heart Association, hypertension is now defined as blood pressure above 130/80 mmHg (previously 140/90 mmHg). First-line treatments include lifestyle modifications such as the DASH diet, regular physical activity, and weight management. For pharmacological treatment, recommended first-line agents include thiazide diuretics, calcium channel blockers, ACE inhibitors, or ARBs. Treatment should be individualized based on comorbidities, with a target BP of <130/80 mmHg for most patients.",

    "Summarize recent research on diabetes management":
      "Recent diabetes management research emphasizes a patient-centered approach with individualized glycemic targets. Key developments include: 1) GLP-1 receptor agonists and SGLT2 inhibitors showing cardiovascular and renal benefits beyond glucose control; 2) Continuous glucose monitoring becoming standard for Type 1 and increasingly for Type 2 diabetes; 3) Time in range (70-180 mg/dL) emerging as an important metric alongside HbA1c; 4) Earlier combination therapy being recommended for patients with HbA1c >1.5% above target; 5) Greater emphasis on addressing social determinants of health in diabetes care plans.",

    "What are the common drug interactions with warfarin?":
      "Warfarin has numerous significant drug interactions due to its narrow therapeutic index. Common interactions include: 1) NSAIDs (increase bleeding risk), 2) Antibiotics like ciprofloxacin, metronidazole, and trimethoprim (increase INR), 3) Antifungals such as fluconazole (increase INR), 4) Amiodarone (potentiates warfarin effect), 5) Statins, particularly simvastatin and lovastatin (increase bleeding risk), 6) Herbal supplements like St. John's Wort (decreases warfarin effect) and ginkgo biloba (increases bleeding risk), 7) Dietary changes with vitamin K-rich foods (antagonize warfarin). Regular INR monitoring is essential when starting or stopping any medication in patients on warfarin.",

    "What's the recommended dosage of amoxicillin for pediatric patients?":
      "For pediatric patients, amoxicillin dosing depends on the indication, age, and weight. For most common infections: Children >3 months: 20-90 mg/kg/day divided into 2-3 doses (standard dose 45 mg/kg/day for most infections). For otitis media: 80-90 mg/kg/day divided into 2 doses. For pharyngitis/tonsillitis: 50 mg/kg/day (max 1000 mg/day) divided into 2-3 doses for 10 days. For pneumonia: 45-90 mg/kg/day divided into 2-3 doses. Always adjust for renal function if necessary and consider local resistance patterns. Maximum daily dose is typically 2-3g depending on the indication.",
  },
  appointments: {
    "Schedule a follow-up appointment for James Wilson next week":
      "I've scheduled a follow-up appointment for James Wilson next Wednesday at 10:30 AM with Dr. Smith. The appointment has been added to your calendar and a notification has been sent to the patient. Would you like me to add any specific preparation instructions for the patient?",

    "Reschedule Sarah Johnson's appointment from tomorrow to Friday":
      "I've rescheduled Sarah Johnson's appointment from tomorrow (Tuesday, June 11) to Friday, June 14 at 2:15 PM. The patient has been notified of this change via email and text message. The appointment is still with Dr. Smith and will be for the same duration (30 minutes). Would you like me to make any other changes to this appointment?",

    "Show me all appointments for next Monday":
      "Here are all appointments scheduled for Monday, June 17:\n\n8:00 AM - Robert Brown (Annual Physical)\n9:00 AM - Emma Davis (Diabetes Follow-up)\n10:30 AM - Michael Thompson (Medication Review)\n1:00 PM - Lisa Anderson (Post-Surgery Follow-up)\n2:30 PM - David Martinez (Initial Consultation)\n3:45 PM - Jennifer Wilson (Lab Results Review)\n\nYou have 6 appointments scheduled with 30-minute breaks between each. Would you like me to make any adjustments to this schedule?",

    "Send appointment reminders to patients with visits tomorrow":
      "I've sent appointment reminders to all 8 patients scheduled for tomorrow, Tuesday, June 11. The reminders were sent via text message and email with instructions to arrive 15 minutes before their appointment time and to bring their insurance card and list of current medications. Would you like me to include any additional information in future appointment reminders?",
  },
  medications: {
    "What are the side effects of Lisinopril?":
      "Common side effects of Lisinopril include:\n\n• Dry, persistent cough (most common)\n• Dizziness or lightheadedness, especially when standing up\n• Headache\n• Fatigue\n• Nausea, diarrhea, or stomach pain\n• Decreased appetite\n• Rash\n• Elevated potassium levels\n\nSerious but less common side effects that require immediate medical attention:\n• Angioedema (swelling of face, lips, tongue, throat)\n• Severe allergic reactions\n• Decreased kidney function\n• Hypotension (very low blood pressure)\n• Syncope (fainting)\n\nPatients should be monitored for hyperkalemia, especially if taking potassium supplements or potassium-sparing diuretics.",

    "Check for interactions between Metformin and Atorvastatin":
      "There is no significant pharmacokinetic interaction between Metformin and Atorvastatin that would require dose adjustment. These medications are commonly prescribed together for patients with type 2 diabetes and dyslipidemia.\n\nHowever, there are some considerations:\n\n1. Both medications can rarely cause elevated liver enzymes, so liver function should be monitored periodically.\n\n2. There is a small increased risk of muscle pain when statins are combined with metformin, though this is not common.\n\n3. Both medications may be affected by kidney function, so renal function should be monitored.\n\nOverall, this combination is considered safe and effective for patients requiring both medications.",

    "What's the recommended dosage of Levothyroxine for a 45-year-old female?":
      "For a 45-year-old female with hypothyroidism, the recommended starting dose of levothyroxine depends on several factors:\n\n• For otherwise healthy adults: Typically 1.6 mcg/kg/day (approximately 100-125 mcg daily for average weight)\n\n• For patients with mild hypothyroidism: Lower starting dose of 25-50 mcg/day may be appropriate\n\n• For patients with cardiovascular disease: Start with 25 mcg/day and increase gradually\n\nDosing should be adjusted based on TSH levels, with testing recommended 6-8 weeks after starting therapy or changing doses. The goal TSH for most adults is 0.4-4.0 mIU/L.\n\nLevothyroxine should be taken on an empty stomach, 30-60 minutes before breakfast, and separated from other medications, calcium, or iron supplements by at least 4 hours.",

    "Generate a prescription for Amoxicillin 500mg":
      "Here's a prescription for Amoxicillin:\n\nRx: Amoxicillin 500mg capsules\nDispense: 30 capsules\nSig: Take 1 capsule by mouth three times daily for 10 days\nRefills: 0\n\nThis prescription has been generated and is ready for your review and signature. Would you like to add any specific instructions or make any changes before finalizing?",
  },
  reminders: {
    "Remind me to review lab results for James Wilson tomorrow":
      "I've set a reminder for you to review James Wilson's lab results tomorrow at 9:00 AM. You'll receive a notification on your dashboard and via email. The lab results include a Complete Blood Count, Comprehensive Metabolic Panel, and Lipid Panel that were completed yesterday. Would you like me to set any additional reminders related to this patient?",

    "Set a reminder for the staff meeting on Friday at 2 PM":
      "I've set a reminder for the staff meeting this Friday at 2:00 PM in Conference Room A. The reminder will be sent to you 30 minutes before the meeting. According to your notes, the agenda includes discussing the new EHR system update, reviewing the monthly patient satisfaction scores, and planning for the upcoming flu vaccination clinic. Would you like me to send this reminder to other staff members as well?",

    "Remind me to call the pharmacy about medication shortages":
      "I've set a reminder for you to call the pharmacy about medication shortages today at 3:00 PM. Based on recent reports, there are current shortages of amoxicillin suspension, certain concentrations of albuterol inhalers, and metoprolol ER. The contact number for Central Pharmacy is (555) 123-4567, and your contact there is Dr. Johnson. Would you like me to compile a list of alternative medications for these shortages?",

    "Set a reminder to follow up with patients who missed appointments this week":
      "I've set a reminder for you to follow up with patients who missed appointments this week. The reminder is scheduled for tomorrow at 11:00 AM. There were 5 missed appointments this week:\n\n1. Sarah Thompson (Monday, 9:00 AM)\n2. Robert Garcia (Tuesday, 2:30 PM)\n3. Emily Chen (Wednesday, 11:15 AM)\n4. Michael Rodriguez (Thursday, 3:45 PM)\n5. Jessica Kim (Friday, 10:00 AM)\n\nWould you like me to prepare a template email or phone script for these follow-ups?",
  },
}

// Initial AI messages
export const initialAIMessage: Message = {
  role: "system",
  content: "Hello, I'm your AI medical assistant. How can I help you today?",
}

// Chatbot responses
export const chatbotResponses = {
  appointment: [
    "I can help you schedule an appointment. What date and time works for you?",
    "Would you like to schedule this as a virtual visit or in-person appointment?",
    "I've scheduled your appointment for next Tuesday at 10:30 AM with Dr. Smith. You'll receive a confirmation email shortly.",
  ],
  medication: [
    "I can provide information about medications. Which specific drug would you like to know about?",
    "Lisinopril is an ACE inhibitor used to treat high blood pressure and heart failure. Common side effects include dry cough, dizziness, and headache.",
    "The typical dosage for adults is 10-40mg once daily. Always take as prescribed by your physician.",
  ],
  reminder: [
    "I'll set a reminder for you. What would you like to be reminded about and when?",
    "I've set a reminder for your medication review on Friday at 2:00 PM.",
    "You'll receive a notification 30 minutes before the scheduled time.",
  ],
  general: [
    "I'm here to help with appointments, drug information, and reminders. How can I assist you with these topics?",
    "Is there anything specific you'd like to know about your treatment plan?",
    "I can help you find information about your condition or medications. What would you like to know?",
  ],
}
