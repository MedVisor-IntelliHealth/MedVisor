import { useEffect, useState } from "react";
import { useMedplum } from "@medplum/react";
import { Patient } from "@medplum/fhirtypes";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { DashboardLayout } from "../components/layout/dashboard-layout";


export default function PatientsPage() {
  const medplum = useMedplum();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [lastVisits, setLastVisits] = useState<Record<string, string>>({});
  const [conditions, setConditions] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);
  const pageSize = 10; // Or 20
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    medplum.searchResources("Patient").then(setPatients).catch(console.error);
  }, [medplum]);

  useEffect(() => {
    if (patients.length === 0) return;

    const fetchEncounters = async () => {
      setLastVisits({});
      setConditions({});
      const newVisits: Record<string, string> = {};
      const newConditions: Record<string, string> = {};

      await Promise.all(
        patients.map(async (patient) => {
          try {
            // 1️⃣ Get latest encounter
            const encounters = await medplum.searchResources(
              'Encounter',
              `subject=Patient/${patient.id}&_sort=-date&_count=1`
            );
            const lastEncounter = encounters?.[0];
            if (!lastEncounter) return;

            // 2️⃣ Save last visit date
            if (lastEncounter.period?.start) {
              newVisits[patient.id!] = new Date(lastEncounter.period.start).toLocaleDateString();
            }

            // 3️⃣ Fetch Condition resource based on encounter ID
            const conditionResults = await medplum.searchResources(
              'Condition',
              `encounter=Encounter/${lastEncounter.id}&_count=1`
            );
            const firstCondition = conditionResults?.[0];

            if (firstCondition?.code?.coding?.[0]?.display) {
              newConditions[patient.id!] = firstCondition.code.coding[0].display;
            } else if (firstCondition?.code?.text) {
              newConditions[patient.id!] = firstCondition.code.text;
            }

          } catch (err) {
            console.error(`Error fetching Encounter/Condition for patient ${patient.id}`, err);
          }
        })
      );

      setLastVisits(newVisits);
      setConditions(newConditions);
    };

    fetchEncounters();
  }, [medplum, patients]);

  useEffect(() => {
    setLoading(true);
    const offset = (page - 1) * pageSize;
    medplum.search('Patient', {
      _count: pageSize,
      _sort: '-_lastUpdated',
      _total: 'accurate',
      _offset: offset
    }).then((bundle) => {
      const entries = bundle.entry || [];
      const resources = entries.map((e) => e.resource as Patient);
      setPatients(resources);
      setTotal(bundle.total ?? 0);
      setLoading(false);
    }).catch((err) => {
      console.error('Failed to fetch paginated patients:', err);
      setLoading(false);
    });
  }, [medplum, page]);


  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Patient List</h1>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Patient
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Patients</CardTitle>
            <CardDescription>Manage and view your patient records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 pb-4">
              <Input placeholder="Search patients..." className="max-w-sm" />
              <select className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <option value="all">All Conditions</option>
              </select>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>

                    <TableHead>Gender</TableHead>
                    <TableHead>Last Visit</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patients.map((patient) => {
                    const name = `${patient.name?.[0]?.given?.join(" ") || ""} ${patient.name?.[0]?.family || ""}`;

                    return (
                      <TableRow key={patient.id}>
                        <TableCell className="font-medium">
                          <Link to={`/patients/${patient.id}`} className="hover:underline">
                            {name || "Unnamed"}
                          </Link>
                        </TableCell>

                        <TableCell>{patient.gender || "Unknown"}</TableCell>
                        <TableCell>{lastVisits[patient.id!] || 'N/A'}</TableCell>
                        <TableCell>{conditions[patient.id!] || 'N/A'}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <Link to={`/patients/${patient.id}`}>View</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-between py-4">
              <p className="text-sm text-muted-foreground">
                Page {page} of {Math.ceil(total / pageSize) || 1}
              </p>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page * pageSize >= total}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
//     