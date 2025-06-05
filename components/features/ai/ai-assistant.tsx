"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Message } from "@/types"
import { aiSuggestions, aiResponses, initialAIMessage } from "@/data/mock-data"

export function AIAssistant() {
  const [activeTab, setActiveTab] = useState("general")
  const [messages, setMessages] = useState<Message[]>([initialAIMessage])
  const [input, setInput] = useState("")
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of chat when messages change
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
      for (const category in aiResponses) {
        const categoryResponses = aiResponses[category as keyof typeof aiResponses]
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
            <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
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
                {Object.entries(aiSuggestions).map(([category, items]) => (
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
  )
}
