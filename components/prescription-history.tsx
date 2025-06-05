"use client"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Mock prescription history data
const prescriptionHistory = [
  {
    id: "RX12345",
    medication: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    prescribedDate: "2023-09-15",
    expiryDate: "2024-03-15",
    status: "Active",
    prescribedBy: "Dr. Michael Smith",
    pharmacy: "City Pharmacy",
    refills: 2,
    notes: "Take with food in the morning.",
  },
  {
    id: "RX12346",
    medication: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    prescribedDate: "2023-08-10",
    expiryDate: "2024-02-10",
    status: "Active",
    prescribedBy: "Dr. Michael Smith",
    pharmacy: "City Pharmacy",
    refills: 3,
    notes: "Take with meals.",
  },
  {
    id: "RX12347",
    medication: "Atorvastatin",
    dosage: "20mg",
    frequency: "Once daily at bedtime",
    prescribedDate: "2023-07-22",
    expiryDate: "2024-01-22",
    status: "Active",
    prescribedBy: "Dr. Michael Smith",
    pharmacy: "City Pharmacy",
    refills: 2,
    notes: "Take at bedtime.",
  },
  {
    id: "RX12348",
    medication: "Hydrochlorothiazide",
    dosage: "25mg",
    frequency: "Once daily",
    prescribedDate: "2023-05-05",
    expiryDate: "2023-11-05",
    status: "Expired",
    prescribedBy: "Dr. Michael Smith",
    pharmacy: "City Pharmacy",
    refills: 0,
    notes: "Take in the morning.",
  },
  {
    id: "RX12349",
    medication: "Amlodipine",
    dosage: "5mg",
    frequency: "Once daily",
    prescribedDate: "2023-04-12",
    expiryDate: "2023-10-12",
    status: "Discontinued",
    prescribedBy: "Dr. Michael Smith",
    pharmacy: "City Pharmacy",
    refills: 0,
    notes: "Discontinued due to ankle swelling.",
  },
]

interface PrescriptionHistoryProps {
  isOpen: boolean
  onClose: () => void
}

export function PrescriptionHistory({ isOpen, onClose }: PrescriptionHistoryProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Prescription History</DialogTitle>
          <DialogDescription>View all prescriptions for this patient</DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rx ID</TableHead>
                <TableHead>Medication</TableHead>
                <TableHead>Dosage</TableHead>
                <TableHead>Prescribed</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Refills</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prescriptionHistory.map((prescription) => (
                <TableRow key={prescription.id}>
                  <TableCell className="font-medium">{prescription.id}</TableCell>
                  <TableCell>{prescription.medication}</TableCell>
                  <TableCell>
                    {prescription.dosage} {prescription.frequency}
                  </TableCell>
                  <TableCell>{prescription.prescribedDate}</TableCell>
                  <TableCell>{prescription.expiryDate}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        prescription.status === "Active"
                          ? "default"
                          : prescription.status === "Expired"
                            ? "outline"
                            : "destructive"
                      }
                    >
                      {prescription.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{prescription.refills}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <Button>Print All</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
