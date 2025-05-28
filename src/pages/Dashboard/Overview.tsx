import { useAuth } from "../../contexts/AuthContext";
import {
  TrendingUp,
  Users,
  CheckCircle,
  Clock,
  FolderOpen,
  Calendar,
  BarChart3,
  Plus,
} from "lucide-react";

export default function Overview() {
  const { user } = useAuth();

  const stats = [
    {
      name: "Active Projects",
      value: "3",
      change: "+2",
      icon: FolderOpen,
      color: "blue",
    },
    {
      name: "Completed Tasks",
      value: "24",
      change: "+12",
      icon: CheckCircle,
      color: "green",
    },
    {
      name: "Pending Tasks",
      value: "8",
      change: "-3",
      icon: Clock,
      color: "yellow",
    },
    {
      name: "Team Members",
      value: "5",
      change: "+1",
      icon: Users,
      color: "purple",
    },
  ];

  const recentProjects = [
    {
      name: "Website Redesign",
      progress: 75,
      dueDate: "2024-01-15",
      status: "In Progress",
    },
    {
      name: "Mobile App",
      progress: 30,
      dueDate: "2024-02-01",
      status: "Planning",
    },
    {
      name: "API Integration",
      progress: 90,
      dueDate: "2024-01-10",
      status: "Review",
    },
  ];

  const upcomingTasks = [
    {
      task: "Review design mockups",
      project: "Website Redesign",
      dueDate: "Today",
    },
    { task: "Client meeting", project: "Mobile App", dueDate: "Tomorrow" },
    { task: "Code review", project: "API Integration", dueDate: "Jan 12" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.email?.split("@")[0] || "User"}!
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your projects today.
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="h-4 w-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-${stat.color}-50`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600 font-medium">
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-1">from last week</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                Recent Projects
              </h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View all
              </button>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {recentProjects.map((project, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{project.name}</h4>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Due {project.dueDate}
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.status === "In Progress"
                          ? "bg-blue-100 text-blue-800"
                          : project.status === "Planning"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                Upcoming Tasks
              </h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View all
              </button>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {upcomingTasks.map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
              >
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{item.task}</h4>
                  <p className="text-sm text-gray-600">{item.project}</p>
                </div>
                <div className="text-sm text-gray-500">{item.dueDate}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <Plus className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-blue-900">
              New Project
            </span>
          </button>
          <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <CheckCircle className="h-8 w-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-green-900">Add Task</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <Users className="h-8 w-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-purple-900">
              Invite Team
            </span>
          </button>
          <button className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
            <BarChart3 className="h-8 w-8 text-orange-600 mb-2" />
            <span className="text-sm font-medium text-orange-900">
              View Reports
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
