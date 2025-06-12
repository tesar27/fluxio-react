import { useProject } from "../../../contexts/ProjectContext";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Filter,
  Calendar,
  Users,
  FolderOpen,
  MoreVertical,
  TrendingUp,
  TrendingDown,
  Clock,
} from "lucide-react";

export default function ProjectList() {
  const { projects, createProject: _createProject } = useProject();
  const navigate = useNavigate();

  const handleProjectClick = (projectId: string) => {
    navigate(`/dashboard/projects/${projectId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Planning":
        return "bg-gray-100 text-gray-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Review":
        return "bg-purple-100 text-purple-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "On Hold":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case "On Track":
        return "bg-green-100 text-green-800 border-green-200";
      case "At Risk":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Critical":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="mt-1 text-gray-600">
            Manage and track all your organization's projects
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            <input
              type="text"
              placeholder="Search projects..."
              className="py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button
            onClick={() => {
              // For now, just navigate to a new project (we'll implement creation later)
              console.log("Create new project");
            }}
            className="flex items-center gap-2 px-4 py-2 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </button>
        </div>
      </div>

      {/* Project Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Projects
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {projects.length}
              </p>
            </div>
            <FolderOpen className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">
                {projects.filter((p) => p.status === "In Progress").length}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">At Risk</p>
              <p className="text-2xl font-bold text-gray-900">
                {
                  projects.filter(
                    (p) => p.health === "At Risk" || p.health === "Critical"
                  ).length
                }
              </p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {projects.filter((p) => p.status === "Completed").length}
              </p>
            </div>
            <TrendingDown className="w-8 h-8 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => handleProjectClick(project.id)}
            className="p-6 transition-all bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer hover:shadow-md hover:border-blue-300 group"
          >
            {/* Project Header */}
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-lg bg-${project.color}-100 flex items-center justify-center`}
              >
                <FolderOpen className={`h-6 w-6 text-${project.color}-600`} />
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Project options");
                }}
                className="p-1 transition-opacity rounded opacity-0 group-hover:opacity-100 hover:bg-gray-100"
              >
                <MoreVertical className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* Project Info */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-700">
                {project.name}
              </h3>
              <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                {project.description}
              </p>
            </div>

            {/* Project Metrics */}
            <div className="mb-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium">{project.progress}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div
                  className={`h-2 rounded-full bg-${project.color}-500 transition-all duration-300`}
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Due {project.dueDate}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{project.team} members</span>
                </div>
              </div>
            </div>

            {/* Project Status & Health */}
            <div className="flex items-center justify-between">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  project.status
                )}`}
              >
                {project.status}
              </span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium border ${getHealthColor(
                  project.health
                )}`}
              >
                {project.health}
              </span>
            </div>

            {/* Tasks Summary */}
            <div className="pt-3 mt-3 border-t border-gray-100">
              <div className="text-xs text-gray-500">
                {project.tasksCompleted} of {project.totalTasks} tasks completed
              </div>
            </div>
          </div>
        ))}

        {/* Add New Project Card */}
        <div
          onClick={() => console.log("Create new project")}
          className="bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300 p-6 hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer flex flex-col items-center justify-center min-h-[280px] group"
        >
          <div className="flex items-center justify-center w-12 h-12 mb-4 transition-colors bg-gray-100 rounded-lg group-hover:bg-blue-100">
            <Plus className="w-6 h-6 text-gray-400 transition-colors group-hover:text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 transition-colors group-hover:text-blue-700">
            Create New Project
          </h3>
          <p className="mt-2 text-sm text-center text-gray-500">
            Start a new project and bring your ideas to life
          </p>
        </div>
      </div>
    </div>
  );
}
