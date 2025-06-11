import { Routes, Route, Navigate } from "react-router-dom";
import Overview from "./Overview";
import Calendar from "./Calendar";
import Kanban from "./Kanban";
import Projects from "./Projects";
import Settings from "./Settings";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/dashboard/overview" replace />}
        />
        <Route path="/overview" element={<Overview />} />
        <Route path="/projects/*" element={<Projects />} />
        <Route path="/kanban" element={<Kanban />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/settings" element={<Settings />} />
        {/* Default redirect for any unmatched routes */}
        <Route
          path="*"
          element={<Navigate to="/dashboard/overview" replace />}
        />
      </Routes>
    </DashboardLayout>
  );
}
