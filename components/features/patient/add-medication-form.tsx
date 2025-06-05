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
import { Checkbox } from "@/components/ui/checkbox"
import type { Condition, LabResult, MedicationRecommendation } from "@/types"
import { getMedicationRecommendations } from "@/utils/medical-utils"

interface AddMedicationFormProps {
  isOpen: boolean
  onClose: () => void
  patientConditions: Condition[]
  patientLabResults: LabResult[]
}

export function AddMedicationForm({ isOpen, onClose, patientConditions, patientLabResults }: AddMedicationFormProps) {
  const [selectedCondition, setSelectedCondition] = useState("")
  const [selectedLabResults, setSelectedLabResults] = useState<string[]>([])
  const [selectedRecommendation, setSelectedRecommendation] = useState<string | null>(null)

  const handleConditionChange = (value: string) => {
    setSelectedCondition(value)
    setSelectedRecommendation(null)
  }

  const handleLabResultToggle = (labId: string) => {
    setSelectedLabResults((prev) => (prev.includes(labId) ? prev.filter((id) => id !== labId) : [...prev, labId]))
  }

  const handleRecommendationSelect = (index: number) => {
    setSelectedRecommendation(index.toString())
  }

  const getRecommendations = (): MedicationRecommendation[] => {
    if (!selectedCondition) return []
    const recommendations = getMedicationRecommendations(selectedCondition)
    return recommendations[selectedCondition] || []
  }

  const recommendations = getRecommendations()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Add New Medication</DialogTitle>
          <DialogDescription>Add a new medication based on patient conditions and lab results</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="condition">Select Condition</Label>
                <Select value={selectedCondition} onValueChange={handleConditionChange}>
                  <SelectTrigger id="condition">
                    <SelectValue placeholder="Select a condition" />
                  </SelectTrigger>
                  <SelectContent>
                    {patientConditions.map((condition, index) => (
                      <SelectItem key={index} value={condition.name}>
                        {condition.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Relevant Lab Results</Label>
                <div className="border rounded-md p-3 space-y-3 mt-1.5 max-h-[200px] overflow-y-auto">
                  {patientLabResults.map((lab, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Checkbox
                        id={`lab-${index}`}
                        checked={selectedLabResults.includes(`lab-${index}`)}
                        onCheckedChange={() => handleLabResultToggle(`lab-${index}`)}
                      />
                      <div className="grid gap-1.5">
                        <Label
                          htmlFor={`lab-${index}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {lab.type} ({lab.date})
                        </Label>
                        <div className="text-xs text-muted-foreground">
                          {lab.results.map((result, rIndex) => (
                            <div key={rIndex}>
                              {result.name}: {result.value} {result.unit}
                              <Badge
                                variant={result.status === "Normal" ? "outline" : "default"}
                                className="ml-1 text-[10px] px-1 py-0"
                              >
                                {result.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <Label>Medication Recommendations</Label>
              <div className="border rounded-md p-3 mt-1.5 h-[300px] overflow-y-auto">
                {selectedCondition ? (
                  recommendations.length > 0 ? (
                    <div className="space-y-3">
                      {recommendations.map((rec, index) => (
                        <div
                          key={index}
                          className={`border rounded-md p-3 cursor-pointer transition-colors ${
                            selectedRecommendation === index.toString()
                              ? "border-primary bg-primary/5"
                              : "hover:border-primary/50"
                          }`}
                          onClick={() => handleRecommendationSelect(index)}
                        >
                          <div className="font-medium">
                            {rec.name} {rec.dosage}
                          </div>
                          <div className="text-sm">{rec.frequency}</div>
                          <div className="text-xs text-muted-foreground mt-1">{rec.notes}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      No recommendations available for this condition
                    </div>
                  )
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    Select a condition to see recommendations
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="medication">Medication Name</Label>
                <Input
                  id="medication"
                  value={
                    selectedRecommendation !== null ? recommendations[Number.parseInt(selectedRecommendation)].name : ""
                  }
                  placeholder="Enter medication name"
                />
              </div>
              <div>
                <Label htmlFor="dosage">Dosage</Label>
                <Input
                  id="dosage"
                  value={
                    selectedRecommendation !== null
                      ? recommendations[Number.parseInt(selectedRecommendation)].dosage
                      : ""
                  }
                  placeholder="Enter dosage"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="frequency">Frequency</Label>
                <Input
                  id="frequency"
                  value={
                    selectedRecommendation !== null
                      ? recommendations[Number.parseInt(selectedRecommendation)].frequency
                      : ""
                  }
                  placeholder="Enter frequency"
                />
              </div>
              <div>
                <Label htmlFor="duration">Duration</Label>
                <Input id="duration" placeholder="Enter duration (e.g., 30 days)" />
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={
                  selectedRecommendation !== null ? recommendations[Number.parseInt(selectedRecommendation)].notes : ""
                }
                placeholder="Enter any additional notes or instructions"
                rows={3}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Add Medication</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
