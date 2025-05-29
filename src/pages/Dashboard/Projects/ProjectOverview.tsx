import { useProject } from "../../../contexts/ProjectContext";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Users,
  Clock,
  Target,
  Activity,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Plus,
  Edit,
  Settings,
  BarChart3,
} from "lucide-react";

export default function ProjectOverview() {
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
          <p className="text-gray-500 mt-1">
            The project you're looking for doesn't exist.
          </p>
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

  // Mock recent activities for the project
  const recentActivities = [
    {
      type: "task_completed",
      message: "Completed 'Design wireframes' task",
      time: "2 hours ago",
      user: "Sarah Wilson",
    },
    {
      type: "task_created",
      message: "Created new task 'API endpoint testing'",
      time: "4 hours ago",
      user: "Mike Johnson",
    },
    {
      type: "comment",
      message: "Added comment on 'Database schema' task",
      time: "6 hours ago",
      user: "Alex Chen",
    },
    {
      type: "file_uploaded",
      message: "Uploaded design mockups",
      time: "1 day ago",
      user: "Emma Davis",
    },
  ];

  // Mock upcoming milestones
  const upcomingMilestones = [
    {
      name: "Design Phase Complete",
      dueDate: "Jan 15, 2025",
      progress: 85,
      status: "On Track",
    },
    {
      name: "Development Kickoff",
      dueDate: "Jan 20, 2025",
      progress: 0,
      status: "Upcoming",
    },
    {
      name: "Beta Release",
      dueDate: "Feb 15, 2025",
      progress: 0,
      status: "Upcoming",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Project Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-4">
            <button
              onClick={() => navigate("/dashboard/projects")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div
              className={`w-16 h-16 rounded-lg bg-${project.color}-100 flex items-center justify-center`}
            >
              <Target className={`h-8 w-8 text-${project.color}-600`} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {project.name}
              </h1>
              <p className="text-gray-600 mt-2 max-w-2xl">
                {project.description}
              </p>
              <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Due {project.dueDate}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{project.team} team members</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Created {project.createdAt}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors">
              <Edit className="h-4 w-4" />
              <span>Edit</span>
            </button>
            <button
              onClick={() =>
                navigate(`/dashboard/projects/${project.id}/settings`)
              }
              className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </button>
          </div>
        </div>

        {/* Project Status */}
        <div className="flex items-center gap-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              project.status === "In Progress"
                ? "bg-blue-100 text-blue-800"
                : project.status === "Planning"
                ? "bg-gray-100 text-gray-800"
                : project.status === "Review"
                ? "bg-purple-100 text-purple-800"
                : project.status === "Completed"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {project.status}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium border ${
              project.health === "On Track"
                ? "bg-green-100 text-green-800 border-green-200"
                : project.health === "At Risk"
                ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                : "bg-red-100 text-red-800 border-red-200"
            }`}
          >
            {project.health}
          </span>
          <div className="text-sm text-gray-600">
            Owner:{" "}
            <span className="font-medium text-gray-900">{project.owner}</span>
          </div>
        </div>
      </div>

      {/* Project Progress & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Overview */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Progress Overview
          </h3>

          <div className="space-y-6">
            {/* Overall Progress */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Overall Progress
                </span>
                <span className="text-sm font-bold text-gray-900">
                  {project.progress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full bg-${project.color}-500 transition-all duration-300`}
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Task Completion */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">
                  {project.tasksCompleted}
                </div>
                <div className="text-sm text-gray-600">Completed Tasks</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">
                  {project.totalTasks - project.tasksCompleted}
                </div>
                <div className="text-sm text-gray-600">Remaining Tasks</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() =>
                  navigate(`/dashboard/projects/${project.id}/board`)
                }
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors"
              >
                <Target className="h-4 w-4" />
                <span>View Board</span>
              </button>
              <button
                onClick={() =>
                  navigate(`/dashboard/projects/${project.id}/tasks`)
                }
                className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors"
              >
                <CheckCircle className="h-4 w-4" />
                <span>All Tasks</span>
              </button>
              <button
                onClick={() =>
                  navigate(`/dashboard/projects/${project.id}/timeline`)
                }
                className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors"
              >
                <BarChart3 className="h-4 w-4" />
                <span>Timeline</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          {/* Team Stats */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Team</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Team Size</span>
                <span className="text-sm font-semibold text-gray-900">
                  {project.team} members
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active Members</span>
                <span className="text-sm font-semibold text-gray-900">
                  {project.team - 1}
                </span>
              </div>
              <button
                onClick={() =>
                  navigate(`/dashboard/projects/${project.id}/team`)
                }
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Manage Team
              </button>
            </div>
          </div>

          {/* Health Indicator */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Project Health
            </h4>
            <div className="text-center">
              <div
                className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3 ${
                  project.health === "On Track"
                    ? "bg-green-100"
                    : project.health === "At Risk"
                    ? "bg-yellow-100"
                    : "bg-red-100"
                }`}
              >
                {project.health === "On Track" ? (
                  <TrendingUp className="h-8 w-8 text-green-600" />
                ) : project.health === "At Risk" ? (
                  <Clock className="h-8 w-8 text-yellow-600" />
                ) : (
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                )}
              </div>
              <div
                className={`text-lg font-semibold ${
                  project.health === "On Track"
                    ? "text-green-700"
                    : project.health === "At Risk"
                    ? "text-yellow-700"
                    : "text-red-700"
                }`}
              >
                {project.health}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Based on current progress and timeline
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity & Milestones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Activity
            </h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === "task_completed"
                      ? "bg-green-500"
                      : activity.type === "task_created"
                      ? "bg-blue-500"
                      : activity.type === "comment"
                      ? "bg-purple-500"
                      : "bg-orange-500"
                  }`}
                ></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">
                      {activity.user}
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">
                      {activity.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Milestones */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Upcoming Milestones
            </h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              <Plus className="h-4 w-4 inline mr-1" />
              Add Milestone
            </button>
          </div>
          <div className="space-y-4">
            {upcomingMilestones.map((milestone, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900">
                    {milestone.name}
                  </h4>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      milestone.status === "On Track"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {milestone.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  Due: {milestone.dueDate}
                </div>
                {milestone.progress > 0 && (
                  <div>
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{milestone.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${milestone.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
