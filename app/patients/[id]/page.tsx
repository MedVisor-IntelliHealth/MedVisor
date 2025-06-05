"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Download, FileText, Pill, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PrescriptionHistory } from "@/components/features/patient/prescription-history"
import { AddMedicationForm } from "@/components/features/patient/add-medication-form"
import { AddConditionForm } from "@/components/features/patient/add-condition-form"
import type { Patient } from "@/types"
import { patientData } from "@/data/mock-data"

export default function PatientDetailsPage() {
  const [isPrescriptionHistoryOpen, setIsPrescriptionHistoryOpen] = useState(false)
  const [isAddMedicationOpen, setIsAddMedicationOpen] = useState(false)
  const [isAddConditionOpen, setIsAddConditionOpen] = useState(false)
  const [patient] = useState<Patient>(patientData)

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/patients">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to patients</span>
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">{patient.name}</h1>
          <Badge variant="outline" className="ml-2">
            {patient.id}
          </Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-7">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-4 text-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt={patient.name} />
                  <AvatarFallback className="text-2xl">
                    {patient.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold">{patient.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {patient.age} years old, {patient.gender}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Date of Birth</h4>
                  <p>{patient.dob}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Contact</h4>
                  <p>{patient.phone}</p>
                  <p>{patient.email}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Address</h4>
                  <p>{patient.address}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Insurance</h4>
                  <p>{patient.insurance}</p>
                  <p>Policy: {patient.policyNumber}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Emergency Contact</h4>
                  <p>{patient.emergencyContact}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="md:col-span-5 space-y-4">
            <Tabs defaultValue="medical-history">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="medical-history">Medical History</TabsTrigger>
                <TabsTrigger value="medications">Medications</TabsTrigger>
                <TabsTrigger value="lab-results">Lab Results</TabsTrigger>
                <TabsTrigger value="visits">Visits</TabsTrigger>
              </TabsList>

              <TabsContent value="medical-history" className="space-y-4 pt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>Medical Conditions</CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => setIsAddConditionOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Condition
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Condition</TableHead>
                          <TableHead>Since</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {patient.conditions.map((condition, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{condition.name}</TableCell>
                            <TableCell>{condition.since}</TableCell>
                            <TableCell>
                              <Badge variant={condition.status === "Active" ? "default" : "outline"}>
                                {condition.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>Allergies</CardTitle>
                      <Button variant="ghost" size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Allergy
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Allergen</TableHead>
                          <TableHead>Severity</TableHead>
                          <TableHead>Reaction</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {patient.allergies.map((allergy, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{allergy.name}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  allergy.severity === "Severe"
                                    ? "destructive"
                                    : allergy.severity === "Moderate"
                                      ? "default"
                                      : "outline"
                                }
                              >
                                {allergy.severity}
                              </Badge>
                            </TableCell>
                            <TableCell>{allergy.reaction}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="medications" className="pt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>Current Medications</CardTitle>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setIsPrescriptionHistoryOpen(true)}>
                          <FileText className="mr-2 h-4 w-4" />
                          Prescription History
                        </Button>
                        <Button size="sm" onClick={() => setIsAddMedicationOpen(true)}>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Medication
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Medication</TableHead>
                          <TableHead>Dosage</TableHead>
                          <TableHead>Frequency</TableHead>
                          <TableHead>Start Date</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {patient.medications.map((medication, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{medication.name}</TableCell>
                            <TableCell>{medication.dosage}</TableCell>
                            <TableCell>{medication.frequency}</TableCell>
                            <TableCell>{medication.startDate}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                <Pill className="mr-2 h-4 w-4" />
                                Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    <div className="mt-6">
                      <Button className="w-full">Generate Medication Recommendation</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="lab-results" className="space-y-4 pt-4">
                {patient.labResults.map((lab, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>{lab.type}</CardTitle>
                          <CardDescription>{lab.date}</CardDescription>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Test</TableHead>
                            <TableHead>Result</TableHead>
                            <TableHead>Unit</TableHead>
                            <TableHead>Reference Range</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {lab.results.map((result, resultIndex) => (
                            <TableRow key={resultIndex}>
                              <TableCell className="font-medium">{result.name}</TableCell>
                              <TableCell>{result.value}</TableCell>
                              <TableCell>{result.unit}</TableCell>
                              <TableCell>{result.range}</TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    result.status === "Normal"
                                      ? "outline"
                                      : result.status === "High"
                                        ? "destructive"
                                        : "default"
                                  }
                                >
                                  {result.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                ))}

                <div className="flex justify-center">
                  <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Lab Results
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="visits" className="space-y-4 pt-4">
                {patient.visits.map((visit, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Visit on {visit.date}</CardTitle>
                          <CardDescription>{visit.reason}</CardDescription>
                        </div>
                        <Button variant="outline" size="sm">
                          <FileText className="mr-2 h-4 w-4" />
                          Full Report
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">Notes</h4>
                        <p>{visit.notes}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <div className="flex justify-center">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Schedule New Visit
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <PrescriptionHistory
        isOpen={isPrescriptionHistoryOpen}
        onClose={() => setIsPrescriptionHistoryOpen(false)}
        patientId={patient.id}
      />

      <AddMedicationForm
        isOpen={isAddMedicationOpen}
        onClose={() => setIsAddMedicationOpen(false)}
        patientConditions={patient.conditions}
        patientLabResults={patient.labResults}
      />

      <AddConditionForm
        isOpen={isAddConditionOpen}
        onClose={() => setIsAddConditionOpen(false)}
        patientLabResults={patient.labResults}
      />
    </DashboardLayout>
  )
}
