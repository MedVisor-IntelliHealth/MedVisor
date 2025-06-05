"use client"

import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { ArrowLeft, Download, FileText, Pill, Plus } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { DashboardLayout } from "../components/layout/dashboard-layout"
import { Badge } from "../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { PrescriptionHistory } from "../components/features/patient/prescription-history"
import { AddMedicationForm } from "../components/features/patient/add-medication-form"
import { AddConditionForm } from "../components/features/patient/add-condition-form"
import type { Patient as Patient1 } from "../types"
import { patientData } from "../data/mock-data"
import { useMedplum } from "@medplum/react";
import { Patient, MedicationDispense, MedicationRequest, Observation } from "@medplum/fhirtypes";

function getRaceFromExtensions(patient: Patient): string {
  const raceExtension = patient.extension?.find(
    (ext) => ext.url === "http://hl7.org/fhir/us/core/StructureDefinition/us-core-race"
  );

  const omb = raceExtension?.extension?.find((e) => e.url === "ombCategory")?.valueCoding?.display;

  return omb || "Unknown";
}


export default function PatientDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const medplum = useMedplum();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPrescriptionHistoryOpen, setIsPrescriptionHistoryOpen] = useState(false)
  const [isAddMedicationOpen, setIsAddMedicationOpen] = useState(false)
  const [isAddConditionOpen, setIsAddConditionOpen] = useState(false)
  const [patient1] = useState<Patient1>(patientData)
  const [observations, setObservations] = useState<Observation[]>([]);
  const [medications, setMedications] = useState<
    { dispense: MedicationDispense; request: MedicationRequest | null }[]
  >([]);
  const [labObservations, setLabObservations] = useState<Observation[]>([]);
  const conditionOptions: any = observations
    .filter((obs) =>
      obs.code?.coding?.some((c) => c.display?.includes("Chief complaint"))
    )
    .map((obs) => obs.valueString)
    .filter((v): v is string => !!v); // filters out undefined
  useEffect(() => {
    if (!id) return;

    medplum.readResource("Patient", id)
      .then((result) => {

        setPatient(result as Patient);
        setLoading(false);
      })
      .catch((err) => {
        setError("Patient not found");
        console.error(err);
        setLoading(false);
      });
  }, [id, medplum]);

  useEffect(() => {
    if (!patient?.id) return;

    // Fetch condition-related Observations (e.g., Chief Complaint)
    medplum.searchResources('Observation', `subject=Patient/${patient.id}&category=survey&_count=100`)
      .then(setObservations)
      .catch((err) => console.error("Error fetching observations:", err));
  }, [medplum, patient?.id]);

  useEffect(() => {
    if (!patient?.id) return;

    medplum.searchResources(
      "Observation",
      `subject=Patient/${patient.id}&category=laboratory&_count=100`
    )
      .then(setLabObservations)
      .catch((err) => {
        console.error("Failed to load lab observations:", err);
      });
  }, [patient?.id, medplum]);

  useEffect(() => {
    if (!patient?.id) return;

    const loadMedications = async () => {
      try {
        const dispenses = await medplum.searchResources(
          "MedicationDispense",
          `subject=Patient/${patient.id}`
        );

        const results = await Promise.all(
          dispenses.map(async (dispense) => {
            const prescriptionRef: any = dispense.authorizingPrescription?.[0]?.reference;
          
            let request: MedicationRequest | any = null;

            if (prescriptionRef) {
              try {
             
                const [resourceType, resourceId] = prescriptionRef.split("/");
                request = await medplum.readResource(resourceType, resourceId);
               
              } catch (err) {
                console.warn(`Failed to load MedicationRequest: ${prescriptionRef}`, err);
              }
            }

            return { dispense, request };
          })
        );
       
        setMedications(results);
      } catch (err) {
        console.error("Failed to load medications:", err);
      }
    };

    loadMedications();
  }, [patient?.id, medplum]);


  if (loading) return <DashboardLayout><p className="p-4">Loading patient...</p></DashboardLayout>;
  if (error) return <DashboardLayout><p className="p-4 text-red-500">{error}</p></DashboardLayout>;
  if (!patient) return null;

  const groupedLabs = labObservations.reduce((groups, obs) => {
    const date = obs.effectiveDateTime?.split("T")[0] ?? "Unknown";
    if (!groups[date]) groups[date] = [];
    groups[date].push(obs);
    return groups;
  }, {} as Record<string, Observation[]>);

  const name = `${patient.name?.[0]?.given?.join(" ") ?? ""} ${patient.name?.[0]?.family ?? ""}`;
  const dob = patient?.birthDate ?? "Unknown";
  const gender = patient.gender ?? "Unknown";


  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/patients">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to patients</span>
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">{name}</h1>
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
                  <AvatarImage src="https://via.placeholder.com/96" alt={name} />
                  <AvatarFallback className="text-2xl">
                    {name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold">{name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {gender}
                  </p>
                </div>

              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Date of Birth</h4>
                  <p>{dob}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Race</h4>
                  <p>{getRaceFromExtensions(patient)}</p>
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
                    <TableBody>
                      {observations.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center text-muted-foreground">
                            No medical conditions recorded.
                          </TableCell>
                        </TableRow>
                      ) : (
                        observations
                          .filter((obs) =>
                            obs.code?.coding?.some((c) => c.display?.includes("Chief complaint"))
                          )
                          .map((obs, index) => (
                            <TableRow key={obs.id || index}>
                              <TableCell className="font-medium">
                                {obs.valueString || "—"}
                              </TableCell>
                              <TableCell>
                                {obs.effectiveDateTime
                                  ? new Date(obs.effectiveDateTime).toLocaleDateString()
                                  : "Unknown"}
                              </TableCell>
                              <TableCell>
                                <Badge variant={obs.status === "final" ? "default" : "outline"}>
                                  {obs.status || "unknown"}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))
                      )}
                    </TableBody>
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
                    {medications.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground">
                          No medications found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      medications.map(({ dispense, request }, index) => {
                        const medName = dispense.medicationCodeableConcept?.coding?.[0]?.code || "—";
                        const doseQuantity = request?.dosageInstruction?.[0]?.doseAndRate?.[0]?.doseQuantity;
                        const dosage = doseQuantity ? `${doseQuantity.value} ${doseQuantity.unit}` : "—";
                        const frequency = request?.dosageInstruction?.[0]?.text || "—";
                        const startDate = request?.dispenseRequest?.validityPeriod?.start
                          ? new Date(request.dispenseRequest.validityPeriod.start).toLocaleDateString()
                          : "—";

                        return (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{medName}</TableCell>
                            <TableCell>{dosage}</TableCell>
                            <TableCell>{frequency}</TableCell>
                            <TableCell>{startDate}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                <Pill className="mr-2 h-4 w-4" />
                                Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}


                    <div className="mt-6">
                      <Button className="w-full">Generate Medication Recommendation</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="lab-results" className="space-y-4 pt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Lab Results</CardTitle>
                    <CardDescription>All recorded lab results for this patient</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Test</TableHead>
                          <TableHead>Result</TableHead>
                          <TableHead>Unit</TableHead>
                          <TableHead>Reference Range</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {labObservations.map((obs, index) => {
                          const testName = obs.code?.coding?.[0]?.display ?? "—";
                          const result = obs.valueQuantity?.value ?? "—";
                          const unit = obs.valueQuantity?.unit ?? "—";

                          const refRange = obs.referenceRange?.[0];
                          const refLow = refRange?.low?.value ?? "—";
                          const refHigh = refRange?.high?.value ?? "—";
                          const refUnit = refRange?.low?.unit ?? unit;

                          const status = obs.status ?? "unknown";
                          const date = obs.effectiveDateTime
                            ? new Date(obs.effectiveDateTime).toLocaleDateString()
                            : "—";

                          return (
                            <TableRow key={index}>
                              <TableCell>{date}</TableCell>
                              <TableCell className="font-medium">{testName}</TableCell>
                              <TableCell>{result}</TableCell>
                              <TableCell>{unit}</TableCell>
                              <TableCell>{refLow} – {refHigh} {refUnit}</TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    status === "final"
                                      ? "default"
                                      : status === "preliminary"
                                        ? "outline"
                                        : "destructive"
                                  }
                                >
                                  {status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="visits" className="space-y-4 pt-4">
                {patient1.visits.map((visit, index) => (
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
        conditions={conditionOptions}
        labResults={labObservations.map((obs) => ({
          id: obs.id!,
          date: obs.effectiveDateTime?.split("T")[0] ?? "—",
          test: obs.code?.coding?.[0]?.display ?? "—",
          value: obs.valueQuantity?.value?.toString() ?? "—",
          unit: obs.valueQuantity?.unit ?? "—",
          status: obs.status ?? "unknown"
        }))}
      />

      <AddConditionForm
        isOpen={isAddConditionOpen}
        onClose={() => setIsAddConditionOpen(false)}
        patientLabResults={patient1.labResults}
      />
    </DashboardLayout>
  )
}
