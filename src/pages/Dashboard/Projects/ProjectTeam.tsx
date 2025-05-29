import { useProject } from "../../../contexts/ProjectContext";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Users } from "lucide-react";

export default function ProjectTeam() {
  const { projects, selectedProject } = useProject();
  const { projectId } = useParams();
  const navigate = useNavigate();

  const project = selectedProject || projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900">
            Project not found
          </h3>
          <button
            onClick={() => navigate("/dashboard/projects")}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(`/dashboard/projects/${project.id}`)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {project.name} - Team
            </h1>
            <p className="text-gray-600 mt-1">
              Manage team members and permissions
            </p>
          </div>
        </div>
      </div>

      {/* Team Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <Users className="h-12 w-12 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Team Management
          </h3>
          <p className="text-center">
            Team management interface is coming soon. Manage members, roles, and
            permissions here.
          </p>
        </div>
      </div>
    </div>
  );
}
