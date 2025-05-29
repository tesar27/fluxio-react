import React from "react";
import { Routes, Route, useParams, Navigate } from "react-router-dom";
import { useProject } from "../../../contexts/ProjectContext";
import ProjectBoard from "./ProjectBoard";
import ProjectTimeline from "./ProjectTimeline";
import ProjectTasks from "./ProjectTasks";
import ProjectTeam from "./ProjectTeam";
import ProjectFiles from "./ProjectFiles";
import ProjectSettings from "./ProjectSettings";
import ProjectList from "./ProjectList";
import ProjectOverview from "./ProjectOverview";

export default function Projects() {
  return (
    <Routes>
      {/* Projects list page */}
      <Route path="/" element={<ProjectList />} />

      {/* Individual project routes */}
      <Route path="/:projectId/*" element={<ProjectRouter />} />

      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/dashboard/projects" replace />} />
    </Routes>
  );
}

function ProjectRouter() {
  const { projectId } = useParams();
  const { projects, setSelectedProject } = useProject();

  const project = projects.find((p) => p.id === projectId);

  // If project not found, redirect to projects list
  if (!project) {
    return <Navigate to="/dashboard/projects" replace />;
  }

  // Set the selected project when entering project routes
  React.useEffect(() => {
    setSelectedProject(project);
    return () => setSelectedProject(null);
  }, [project, setSelectedProject]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="overview" replace />} />
      <Route path="/overview" element={<ProjectOverview />} />
      <Route path="/board" element={<ProjectBoard />} />
      <Route path="/timeline" element={<ProjectTimeline />} />
      <Route path="/tasks" element={<ProjectTasks />} />
      <Route path="/team" element={<ProjectTeam />} />
      <Route path="/files" element={<ProjectFiles />} />
      <Route path="/settings" element={<ProjectSettings />} />
      <Route path="*" element={<Navigate to="overview" replace />} />
    </Routes>
  );
}
