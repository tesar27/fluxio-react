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
  const { projects, createProject } = useProject();
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
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-1">
            Manage and track all your organization's projects
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
          <button
            onClick={() => {
              // For now, just navigate to a new project (we'll implement creation later)
              console.log("Create new project");
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>New Project</span>
          </button>
        </div>
      </div>

      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Projects
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {projects.length}
              </p>
            </div>
            <FolderOpen className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">
                {projects.filter((p) => p.status === "In Progress").length}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
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
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {projects.filter((p) => p.status === "Completed").length}
              </p>
            </div>
            <TrendingDown className="h-8 w-8 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => handleProjectClick(project.id)}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group"
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
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded"
              >
                <MoreVertical className="h-4 w-4 text-gray-400" />
              </button>
            </div>

            {/* Project Info */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                {project.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {project.description}
              </p>
            </div>

            {/* Project Metrics */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full bg-${project.color}-500 transition-all duration-300`}
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Due {project.dueDate}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
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
            <div className="mt-3 pt-3 border-t border-gray-100">
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
          <div className="w-12 h-12 rounded-lg bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center mb-4 transition-colors">
            <Plus className="h-6 w-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 group-hover:text-blue-700 transition-colors">
            Create New Project
          </h3>
          <p className="text-sm text-gray-500 text-center mt-2">
            Start a new project and bring your ideas to life
          </p>
        </div>
      </div>
    </div>
  );
}
