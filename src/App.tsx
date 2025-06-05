import { Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
import PatientsPage from "./pages/PatientsPage"
import PatientDetailsPage from "./pages/PatientDetailsPage"
import AIAssistantPage from "./pages/AIAssistantPage"
import SettingsPage from "./pages/SettingsPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/patients" element={<PatientsPage />} />
      <Route path="/patients/:id" element={<PatientDetailsPage />} />
      <Route path="/ai-assistant" element={<AIAssistantPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
