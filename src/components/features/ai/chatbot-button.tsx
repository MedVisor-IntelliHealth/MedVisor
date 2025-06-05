"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { MessageSquare } from "lucide-react"
import { Button } from "../../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog"
import { Input } from "../../ui/input"
import { ScrollArea } from "../../ui/scroll-area"
import type { Message } from "../../../types"
import { chatbotResponses } from "../../../data/mock-data"

export function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
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
    const newMessages:any = [...messages, { role: "user", content: input }]
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
    const responses = chatbotResponses[responseCategory as keyof typeof chatbotResponses]
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
          <MessageSquare className="h-6 w-6" />
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
