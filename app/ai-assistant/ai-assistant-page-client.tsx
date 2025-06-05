"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardLayout } from "@/components/dashboard-layout"

// Sample suggestions for different categories
const suggestions = {
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

// Mock responses for each suggestion
const mockResponses = {
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

export default function AIAssistantPageClient() {
  const [activeTab, setActiveTab] = useState("general")
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: "Hello, I'm your AI medical assistant. How can I help you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [chatContainerRef, setChatContainerRef] = useState<HTMLDivElement | null>(null)

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    if (chatContainerRef) {
      chatContainerRef.scrollTop = chatContainerRef.scrollHeight
    }
  }, [messages, chatContainerRef])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const newMessages = [...messages, { role: "user", content: input }]
    setMessages(newMessages)

    // Process the message and generate a response
    generateResponse(input)

    // Clear input
    setInput("")
  }

  const generateResponse = (userInput: string) => {
    // Simulate AI response with a slight delay
    setTimeout(() => {
      let response = ""

      // Check if the input matches any of our predefined suggestions
      for (const category in mockResponses) {
        const categoryResponses = mockResponses[category as keyof typeof mockResponses]
        if (categoryResponses[userInput as keyof typeof categoryResponses]) {
          response = categoryResponses[userInput as keyof typeof categoryResponses]
          break
        }
      }

      // If no predefined response, generate a generic one based on keywords
      if (!response) {
        if (userInput.toLowerCase().includes("appointment")) {
          response =
            "I can help you manage appointments. Would you like to schedule, reschedule, or view your appointments?"
        } else if (userInput.toLowerCase().includes("medication") || userInput.toLowerCase().includes("drug")) {
          response =
            "I can provide information about medications, including dosages, side effects, and interactions. Which specific medication would you like to know about?"
        } else if (userInput.toLowerCase().includes("reminder")) {
          response = "I'll set a reminder for you. Please let me know what you'd like to be reminded about and when."
        } else if (userInput.toLowerCase().includes("patient")) {
          response = "I can help you access patient information. Please provide the patient's name or ID number."
        } else {
          response =
            "I'm here to help with medical information, appointments, medications, and reminders. How can I assist you with these topics?"
        }
      }

      setMessages((prev) => [...prev, { role: "system", content: response }])
    }, 1000)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)

    // Automatically send the suggestion
    const newMessages = [...messages, { role: "user", content: suggestion }]
    setMessages(newMessages)

    // Generate response for the suggestion
    generateResponse(suggestion)

    // Clear input
    setInput("")
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">AI Assistant</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="md:col-span-2 h-[calc(100vh-12rem)]">
            <CardHeader>
              <CardTitle>Medical AI Assistant</CardTitle>
              <CardDescription>
                Ask questions about medical information, schedule appointments, get drug information, or set reminders
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 h-[calc(100vh-16rem)]">
              <ScrollArea className="h-full p-4" ref={(ref) => setChatContainerRef(ref)}>
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`rounded-lg px-4 py-2 max-w-[80%] ${
                          message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter className="border-t p-4">
              <form onSubmit={handleSend} className="flex w-full items-center gap-2">
                <Input
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </CardFooter>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Suggestions</CardTitle>
                <CardDescription>Click on any suggestion to use it</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="appointments">Appts</TabsTrigger>
                    <TabsTrigger value="medications">Meds</TabsTrigger>
                    <TabsTrigger value="reminders">Remind</TabsTrigger>
                  </TabsList>
                  {Object.entries(suggestions).map(([category, items]) => (
                    <TabsContent key={category} value={category} className="p-4">
                      <div className="space-y-2">
                        {items.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            className="w-full justify-start text-left h-auto py-2"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Interactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="rounded-lg border p-3">
                    <p className="font-medium">Drug Interaction Check</p>
                    <p className="text-sm text-muted-foreground">Yesterday at 2:30 PM</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <p className="font-medium">Appointment Scheduling</p>
                    <p className="text-sm text-muted-foreground">Yesterday at 10:15 AM</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <p className="font-medium">Treatment Guidelines</p>
                    <p className="text-sm text-muted-foreground">Monday at 4:45 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
