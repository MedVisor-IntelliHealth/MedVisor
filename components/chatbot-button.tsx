"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { MessageSquareText } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock responses for common queries
const mockResponses = {
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

export function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: "Hello! I'm your AI assistant. How can I help you today?",
    },
  ])
  const [input, setInput] = useState("")
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const newMessages = [...messages, { role: "user", content: input }]
    setMessages(newMessages)
    setInput("")

    // Determine response category
    let responseCategory = "general"
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes("appointment") || lowerInput.includes("schedule") || lowerInput.includes("visit")) {
      responseCategory = "appointment"
    } else if (
      lowerInput.includes("drug") ||
      lowerInput.includes("medication") ||
      lowerInput.includes("prescription")
    ) {
      responseCategory = "medication"
    } else if (lowerInput.includes("reminder") || lowerInput.includes("remind") || lowerInput.includes("alert")) {
      responseCategory = "reminder"
    }

    // Get random response from appropriate category
    const responses = mockResponses[responseCategory as keyof typeof mockResponses]
    const randomIndex = Math.floor(Math.random() * responses.length)
    const response = responses[randomIndex]

    // Simulate AI response with delay
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "system", content: response }])
    }, 1000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg" size="icon">
          <MessageSquareText className="h-6 w-6" />
          <span className="sr-only">Open AI Assistant</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>AI Assistant</DialogTitle>
          <DialogDescription>Ask about appointments, drug information, or set reminders.</DialogDescription>
        </DialogHeader>
        <div className="flex h-[400px] flex-col">
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
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
          <form onSubmit={handleSend} className="flex items-center gap-2 p-4 border-t">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="sm">
              Send
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
