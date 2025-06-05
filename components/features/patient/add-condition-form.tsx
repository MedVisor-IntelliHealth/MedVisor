"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import type { LabResult } from "@/types"
import { conditionSuggestions } from "@/data/mock-data"

// Common conditions for quick selection
const commonConditions = [
  "Hypertension",
  "Type 2 Diabetes",
  "Hyperlipidemia",
  "Asthma",
  "COPD",
  "Coronary Artery Disease",
  "Osteoarthritis",
  "Depression",
  "Anxiety",
  "Hypothyroidism",
  "GERD",
  "Chronic Kidney Disease",
]

interface AddConditionFormProps {
  isOpen: boolean
  onClose: () => void
  patientLabResults: LabResult[]
}

export function AddConditionForm({ isOpen, onClose, patientLabResults }: AddConditionFormProps) {
  const [conditionName, setConditionName] = useState("")
  const [conditionDate, setConditionDate] = useState<Date | undefined>(new Date())
  const [conditionStatus, setConditionStatus] = useState("Active")
  const [conditionNotes, setConditionNotes] = useState("")
  const [selectedSuggestion, setSelectedSuggestion] = useState<number | null>(null)

  const handleSuggestionSelect = (index: number) => {
    setSelectedSuggestion(index)
    setConditionName(conditionSuggestions[index].name)
  }

  const handleCommonConditionSelect = (condition: string) => {
    setConditionName(condition)
    setSelectedSuggestion(null)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Add New Condition</DialogTitle>
          <DialogDescription>Add a new medical condition to the patient's record</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="condition-name">Condition Name</Label>
                <Input
                  id="condition-name"
                  value={conditionName}
                  onChange={(e) => setConditionName(e.target.value)}
                  placeholder="Enter condition name"
                />
              </div>

              <div>
                <Label>Common Conditions</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {commonConditions.slice(0, 8).map((condition, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className={`cursor-pointer hover:bg-primary/10 ${
                        conditionName === condition ? "bg-primary/10 border-primary" : ""
                      }`}
                      onClick={() => handleCommonConditionSelect(condition)}
                    >
                      {condition}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="condition-date">Onset Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !conditionDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {conditionDate ? format(conditionDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={conditionDate} onSelect={setConditionDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label htmlFor="condition-status">Status</Label>
                  <Select value={conditionStatus} onValueChange={setConditionStatus}>
                    <SelectTrigger id="condition-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Resolved">Resolved</SelectItem>
                      <SelectItem value="In Remission">In Remission</SelectItem>
                      <SelectItem value="Chronic">Chronic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="condition-notes">Notes</Label>
                <Textarea
                  id="condition-notes"
                  value={conditionNotes}
                  onChange={(e) => setConditionNotes(e.target.value)}
                  placeholder="Enter any additional notes about this condition"
                  rows={3}
                />
              </div>
            </div>

            <div>
              <Label>Suggested Conditions Based on Lab Results</Label>
              <div className="border rounded-md p-3 mt-1.5 h-[300px] overflow-y-auto">
                {conditionSuggestions.length > 0 ? (
                  <div className="space-y-3">
                    {conditionSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className={`border rounded-md p-3 cursor-pointer transition-colors ${
                          selectedSuggestion === index ? "border-primary bg-primary/5" : "hover:border-primary/50"
                        }`}
                        onClick={() => handleSuggestionSelect(index)}
                      >
                        <div className="flex justify-between items-center">
                          <div className="font-medium">{suggestion.name}</div>
                          <Badge
                            variant={
                              suggestion.confidence === "High"
                                ? "default"
                                : suggestion.confidence === "Medium"
                                  ? "outline"
                                  : "secondary"
                            }
                          >
                            {suggestion.confidence} confidence
                          </Badge>
                        </div>
                        <div className="text-sm mt-2">
                          <div className="text-muted-foreground mb-1">Supporting evidence:</div>
                          <ul className="list-disc list-inside space-y-1">
                            {suggestion.evidence.map((item, i) => (
                              <li key={i} className="text-xs">
                                {item.test}: {item.value} <span className="text-destructive">({item.status})</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    No condition suggestions available based on lab results
                  </div>
                )}
              </div>

              <div className="mt-4">
                <Label>Related Lab Results</Label>
                <div className="border rounded-md p-3 mt-1.5 max-h-[200px] overflow-y-auto">
                  {patientLabResults.map((lab, index) => (
                    <div key={index} className="mb-3 last:mb-0">
                      <div className="font-medium text-sm">
                        {lab.type} <span className="text-muted-foreground">({lab.date})</span>
                      </div>
                      <div className="mt-1 space-y-1">
                        {lab.results
                          .filter((result) => result.status !== "Normal")
                          .map((result, rIndex) => (
                            <div key={rIndex} className="text-xs flex items-center">
                              <div className="w-1/3">{result.name}:</div>
                              <div className="w-1/3">
                                {result.value} {result.unit}
                              </div>
                              <Badge
                                variant={result.status === "Normal" ? "outline" : "default"}
                                className="text-[10px] px-1 py-0"
                              >
                                {result.status}
                              </Badge>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Add Condition</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
