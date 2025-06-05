"use client"

import { useState } from "react"
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
import type { Prescription } from "@/types"
import { prescriptionHistory } from "@/data/mock-data"

interface PrescriptionHistoryProps {
  isOpen: boolean
  onClose: () => void
  patientId?: string
}

export function PrescriptionHistory({ isOpen, onClose, patientId }: PrescriptionHistoryProps) {
  // In a real app, we would fetch prescriptions based on patientId
  const [prescriptions] = useState<Prescription[]>(prescriptionHistory)

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
              {prescriptions.map((prescription) => (
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
