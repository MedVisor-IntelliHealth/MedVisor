"use client"

import * as React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useMedplum } from "@medplum/react"


interface AddMedicationFormProps {
  isOpen: boolean
  onClose: () => void
  conditions: string[]
  labResults: {
    id: string
    date: string
    test: string
    value: string
    unit: string
    status: string
  }[]
}

export function AddMedicationForm({ isOpen, onClose, conditions, labResults }: AddMedicationFormProps) {
  const [selectedCondition, setSelectedCondition] = useState("")
  const [selectedLabResults, setSelectedLabResults] = useState<string[]>([])
  const [recommendation, setRecommendation] = useState("")
  const [notes, setNotes] = useState("")
  const medplum = useMedplum()

  const handleLabResultToggle = (id: string) => {
    setSelectedLabResults((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }


  const handleGenerateRecommendation = async () => {
    try {
      console.log("Generating recommendation...")

      // Step 1: Fetch valueuom, ref_range_lower, ref_range_upper from selected labs
      let valueuom = 0
      let ref_range_lower = 0
      let ref_range_upper = 0

      if (selectedLabResults.length > 0) {
        const labObs = await medplum.readResource("Observation", selectedLabResults[0])

        valueuom = labObs?.valueQuantity?.value ?? 0
        ref_range_lower = labObs?.referenceRange?.[0]?.low?.value ?? 0
        ref_range_upper = labObs?.referenceRange?.[0]?.high?.value ?? 0
      }

      // Step 2: Compose the full request payload
      const requestData = {
        "BMI (kg/m2)": 0.68,
        "Blood Pressure": 25,
        "temperature": 0.99,
        "heartrate": 0.72,
        "o2sat": 0.98,
        "sbp": 0.68,
        "dbp": 0.78,
        "pain": 0.23,
        "acuity": 0.5,
        "chiefcomplaint": selectedCondition,
        "value": 0.000248,
        valueuom,
        ref_range_lower,
        ref_range_upper,
        priority: 1,
        gender_F: 1,
        gender_M: 0,
        flag_abnormal: 1
      }

      // Step 3: Call your backend /predict
      const response = await fetch("http://localhost:4001/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData)
      })

      const result = await response.json()

      const formatted = `Prediction: ${result.prediction}`
      setRecommendation(formatted)
    } catch (error) {
      console.error("Error generating recommendation:", error)
      setRecommendation("⚠️ Error during recommendation.")
    }
  }

  const handleAddMedication = () => {
    console.log("Saving medication:", { selectedCondition, selectedLabResults, recommendation, notes })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Medication</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Side-by-side section for conditions and labs */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Related Condition */}
            <div className="grid gap-2">
              <Label>Related Condition</Label>
              <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a condition" />
                </SelectTrigger>
                <SelectContent>
                  {conditions.map((condition, index) => (
                    <SelectItem key={index} value={condition}>
                      {condition}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Lab Results */}
            <div className="grid gap-2">
              <Label>Relevant Lab Results</Label>
              <div className="grid gap-2 max-h-48 overflow-y-auto border rounded p-2">
                {labResults.map((lab) => (
                  <div key={lab.id} className="flex items-start space-x-2">
                    <Checkbox
                      id={`lab-${lab.id}`}
                      checked={selectedLabResults.includes(lab.id)}
                      onCheckedChange={() => handleLabResultToggle(lab.id)}
                    />
                    <div className="grid gap-1.5">
                      <Label
                        htmlFor={`lab-${lab.id}`}
                        className="text-sm font-medium leading-none"
                      >
                        {lab.test} ({lab.date})
                      </Label>
                      <div className="text-xs text-muted-foreground">
                        {lab.value} {lab.unit}
                        <Badge
                          variant={lab.status === "Normal" ? "outline" : "default"}
                          className="ml-1 text-[10px] px-1 py-0"
                        >
                          {lab.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommendation */}
          <div className="grid gap-2">
            <Label>AI Medication Recommendation</Label>
            <Textarea
              value={recommendation}
              onChange={(e) => setRecommendation(e.target.value)}
              placeholder="AI-generated recommendation will appear here"
              rows={3}
            />
            <Button type="button" size="sm" onClick={handleGenerateRecommendation}>
              Generate Recommendation
            </Button>
          </div>

          {/* Notes */}
          <div className="grid gap-2">
            <Label>Additional Notes</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Clinician notes or instructions"
              rows={3}
            />
          </div>

          {/* Submit */}
          <Button type="button" onClick={handleAddMedication}>
            Add Medication
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
