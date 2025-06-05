import { Activity, AlertTriangle, Calendar, ClipboardList, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Today
            </Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">248</div>
              <p className="text-xs text-muted-foreground">+12 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Lab Results</CardTitle>
              <ClipboardList className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">16</div>
              <p className="text-xs text-muted-foreground">4 urgent results</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Appointments Today</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Next: Sarah Johnson at 10:30 AM</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Medication Reviews</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Due within 7 days</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent patient interactions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 rounded-lg border p-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                    <Activity className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Lab results received for James Wilson</p>
                    <p className="text-xs text-muted-foreground">10 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-lg border p-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-alert-medium/10">
                    <AlertTriangle className="h-5 w-5 text-alert-medium" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Medication interaction alert for Emma Davis</p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-lg border p-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Appointment scheduled with Robert Brown</p>
                    <p className="text-xs text-muted-foreground">3 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-lg border p-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                    <Users className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New patient registered: Lisa Thompson</p>
                    <p className="text-xs text-muted-foreground">Yesterday at 2:30 PM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Alerts</CardTitle>
              <CardDescription>Important notifications requiring your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 rounded-lg border border-alert-high/20 bg-alert-high/5 p-3">
                  <div className="flex-1">
                    <p className="text-sm font-medium">Critical lab value for patient #12458</p>
                    <p className="text-xs text-muted-foreground">Potassium level: 6.8 mmol/L</p>
                  </div>
                  <Button size="sm" variant="destructive">
                    Review
                  </Button>
                </div>
                <div className="flex items-center gap-4 rounded-lg border border-alert-medium/20 bg-alert-medium/5 p-3">
                  <div className="flex-1">
                    <p className="text-sm font-medium">Medication refill request</p>
                    <p className="text-xs text-muted-foreground">Patient: Michael Johnson - Lisinopril 10mg</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Process
                  </Button>
                </div>
                <div className="flex items-center gap-4 rounded-lg border border-alert-low/20 bg-alert-low/5 p-3">
                  <div className="flex-1">
                    <p className="text-sm font-medium">Appointment reminder</p>
                    <p className="text-xs text-muted-foreground">Follow-up with Sarah Wilson tomorrow at 2:00 PM</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Confirm
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
