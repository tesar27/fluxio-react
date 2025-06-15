import { useAuth } from "../../contexts/AuthContext";
import { useProject } from "../../contexts/ProjectContext";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp,
  TrendingDown,
  Users,
  CheckCircle,
  Clock,
  FolderOpen,
  Calendar,
  BarChart3,
  Plus,
  AlertTriangle,
  Target,
  Activity,
  ArrowRight,
} from "lucide-react";

export default function Overview() {
  const { user } = useAuth();
  const {
    projects,
    selectedProject: _selectedProject,
    setSelectedProject: _setSelectedProject,
  } = useProject();
  const navigate = useNavigate();

  // Calculate global metrics from projects data
  const activeProjects = projects.filter(
    (p) => p.status !== "Completed"
  ).length;
  const totalTasks = projects.reduce((sum, p) => sum + p.totalTasks, 0);
  const completedTasks = projects.reduce((sum, p) => sum + p.tasksCompleted, 0);
  const overdueTasks = projects.filter(
    (p) => new Date(p.dueDate) < new Date() && p.status !== "Completed"
  ).length;
  const avgProductivity =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Enhanced global metrics
  const stats = [
    {
      name: "Active Projects",
      value: activeProjects.toString(),
      change: "+2",
      changeType: "increase",
      period: "this month",
      icon: FolderOpen,
      color: "blue",
      description: "Currently running projects",
    },
    {
      name: "Total Tasks",
      value: totalTasks.toString(),
      change: "+23",
      changeType: "increase",
      period: "this week",
      icon: CheckCircle,
      color: "green",
      description: "Across all projects",
    },
    {
      name: "Overdue Items",
      value: overdueTasks.toString(),
      change: "-2",
      changeType: "decrease",
      period: "from last week",
      icon: AlertTriangle,
      color: "red",
      description: "Require immediate attention",
    },
    {
      name: "Team Productivity",
      value: `${avgProductivity}%`,
      change: "+5%",
      changeType: "increase",
      period: "this month",
      icon: TrendingUp,
      color: "purple",
      description: "Average completion rate",
    },
  ];

  // Project health overview - calculated from actual projects
  const projectHealth = [
    {
      status: "On Track",
      count: projects.filter((p) => p.health === "On Track").length,
      color: "green",
    },
    {
      status: "At Risk",
      count: projects.filter((p) => p.health === "At Risk").length,
      color: "yellow",
    },
    {
      status: "Critical",
      count: projects.filter((p) => p.health === "Critical").length,
      color: "red",
    },
  ];

  const recentProjects = projects;

  const todayActivity = [
    {
      type: "task_completed",
      message: "Completed 'Design review' in Website Redesign",
      time: "2 hours ago",
      user: "Sarah Wilson",
    },
    {
      type: "project_updated",
      message: "Updated API Integration project status",
      time: "4 hours ago",
      user: "Mike Johnson",
    },
    {
      type: "team_joined",
      message: "Alex Chen joined Mobile App Development",
      time: "6 hours ago",
      user: "Alex Chen",
    },
    {
      type: "deadline_approaching",
      message: "API Integration deadline in 3 days",
      time: "8 hours ago",
      user: "System",
    },
  ];

  const upcomingDeadlines = [
    {
      project: "API Integration",
      task: "Final code review",
      dueDate: "Jan 10",
      priority: "high",
      daysLeft: 3,
    },
    {
      project: "Website Redesign",
      task: "Client presentation",
      dueDate: "Jan 15",
      priority: "medium",
      daysLeft: 8,
    },
    {
      project: "Database Migration",
      task: "Data backup verification",
      dueDate: "Jan 20",
      priority: "high",
      daysLeft: 13,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.email?.split("@")[0] || "User"}!
          </h1>
          <p className="text-gray-600 mt-1">
            Here's your organization's performance overview and key insights.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors">
            <BarChart3 className="h-4 w-4" />
            <span>View Reports</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors">
            <Plus className="h-4 w-4" />
            <span>New Project</span>
          </button>
        </div>
      </div>

      {/* Project Selector */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Quick Project Access
          </h3>
          <span className="text-sm text-gray-500">
            {projects.length} projects total
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {projects.slice(0, 8).map((project) => (
            <button
              key={project.id}
              onClick={() => navigate(`/dashboard/projects/${project.id}`)}
              className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:shadow-sm hover:border-blue-300 transition-all text-left group"
            >
              <div
                className={`w-10 h-10 rounded-lg bg-${project.color}-100 flex items-center justify-center`}
              >
                <FolderOpen className={`h-5 w-5 text-${project.color}-600`} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 truncate group-hover:text-blue-700">
                  {project.name}
                </h4>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{project.progress}%</span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-xs ${
                      project.health === "On Track"
                        ? "bg-green-100 text-green-700"
                        : project.health === "At Risk"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {project.health}
                  </span>
                </div>
              </div>
            </button>
          ))}
          {projects.length > 8 && (
            <button
              onClick={() => navigate("/dashboard/projects")}
              className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors text-gray-600 hover:text-blue-700"
            >
              <Plus className="h-4 w-4" />
              <span className="text-sm font-medium">View All</span>
            </button>
          )}
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-${stat.color}-50`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-3">{stat.description}</p>
            <div className="flex items-center">
              {stat.changeType === "increase" ? (
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span
                className={`text-sm font-medium ${
                  stat.changeType === "increase"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-1">{stat.period}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Project Health Overview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Project Health Overview
          </h3>
          <div className="text-sm text-gray-500">Total: 8 projects</div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {projectHealth.map((health) => (
            <div key={health.status} className="text-center">
              <div
                className={`w-16 h-16 mx-auto rounded-full bg-${health.color}-100 flex items-center justify-center mb-2`}
              >
                <Target className={`h-8 w-8 text-${health.color}-600`} />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {health.count}
              </div>
              <div className="text-sm text-gray-600">{health.status}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Active Projects
              </h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                View all
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {recentProjects.map((project, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {project.name}
                    </h4>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Due {project.dueDate}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {project.team} members
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      project.health === "On Track"
                        ? "bg-green-100 text-green-800"
                        : project.health === "At Risk"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {project.health}
                  </span>
                </div>

                <div className="mb-3">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>
                      {project.progress}% ({project.tasksCompleted}/
                      {project.totalTasks} tasks)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        project.health === "On Track"
                          ? "bg-green-500"
                          : project.health === "At Risk"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      project.status === "In Progress"
                        ? "bg-blue-100 text-blue-800"
                        : project.status === "Planning"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {project.status}
                  </span>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View Project →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Activity & Upcoming Deadlines */}
        <div className="space-y-6">
          {/* Activity Feed */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Today's Activity
              </h3>
            </div>
            <div className="p-6 space-y-4">
              {todayActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === "task_completed"
                        ? "bg-green-500"
                        : activity.type === "project_updated"
                        ? "bg-blue-500"
                        : activity.type === "team_joined"
                        ? "bg-purple-500"
                        : "bg-yellow-500"
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

          {/* Upcoming Deadlines */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Upcoming Deadlines
              </h3>
            </div>
            <div className="p-6 space-y-4">
              {upcomingDeadlines.map((deadline, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      {deadline.task}
                    </h4>
                    <p className="text-sm text-gray-600">{deadline.project}</p>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-sm font-medium ${
                        deadline.daysLeft <= 3
                          ? "text-red-600"
                          : deadline.daysLeft <= 7
                          ? "text-yellow-600"
                          : "text-gray-600"
                      }`}
                    >
                      {deadline.daysLeft} days left
                    </div>
                    <div className="text-xs text-gray-500">
                      {deadline.dueDate}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group">
              <Plus className="h-8 w-8 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-blue-900">
                New Project
              </span>
            </button>
            <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group">
              <CheckCircle className="h-8 w-8 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-green-900">
                Add Task
              </span>
            </button>
            <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group">
              <Users className="h-8 w-8 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-purple-900">
                Invite Team
              </span>
            </button>
            <button className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors group">
              <BarChart3 className="h-8 w-8 text-orange-600 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-orange-900">
                Reports
              </span>
            </button>
          </div>
        </div>

        {/* Team Performance */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Team Performance
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Tasks Completed</span>
              <span className="text-sm font-semibold text-gray-900">
                142 / 167
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: "85%" }}
              ></div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">On-time Delivery</span>
              <span className="text-sm font-semibold text-gray-900">94%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: "94%" }}
              ></div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Team Utilization</span>
              <span className="text-sm font-semibold text-gray-900">78%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full"
                style={{ width: "78%" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Notifications/Alerts */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Important Alerts
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-900">
                  API Integration overdue
                </p>
                <p className="text-xs text-red-700">3 days past deadline</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
              <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-900">
                  Client meeting tomorrow
                </p>
                <p className="text-xs text-yellow-700">
                  Website Redesign project
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <Activity className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">
                  New team member joined
                </p>
                <p className="text-xs text-blue-700">
                  Alex Chen - Mobile App project
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
