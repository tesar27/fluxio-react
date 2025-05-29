import { useProject } from "../../../contexts/ProjectContext";
import {
  Calendar,
  Clock,
  User,
  FolderOpen,
  AlertCircle,
  CheckCircle,
  CircleDot,
  Filter,
  Plus,
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "inprogress" | "review" | "done";
  priority: "low" | "medium" | "high";
  assignee: string;
  dueDate: string;
  projectId: string;
  projectName: string;
  projectColor: string;
}

// Mock task data - in a real app this would come from the backend
const mockTasks: Task[] = [
  {
    id: "1",
    title: "Design Landing Page",
    description: "Create wireframes and mockups for the new landing page",
    status: "todo",
    priority: "high",
    assignee: "Sarah Johnson",
    dueDate: "2024-01-15",
    projectId: "1",
    projectName: "Website Redesign",
    projectColor: "#3B82F6",
  },
  {
    id: "2",
    title: "API Integration",
    description: "Integrate third-party payment API",
    status: "inprogress",
    priority: "high",
    assignee: "Mike Chen",
    dueDate: "2024-01-18",
    projectId: "2",
    projectName: "E-commerce Platform",
    projectColor: "#10B981",
  },
  {
    id: "3",
    title: "User Testing",
    description: "Conduct usability testing with 10 users",
    status: "review",
    priority: "medium",
    assignee: "Emily Davis",
    dueDate: "2024-01-20",
    projectId: "3",
    projectName: "Mobile App",
    projectColor: "#F59E0B",
  },
  {
    id: "4",
    title: "Database Migration",
    description: "Migrate customer data to new database schema",
    status: "done",
    priority: "high",
    assignee: "Alex Rodriguez",
    dueDate: "2024-01-12",
    projectId: "4",
    projectName: "Data Migration",
    projectColor: "#EF4444",
  },
  {
    id: "5",
    title: "Content Strategy",
    description: "Develop content strategy for Q1",
    status: "todo",
    priority: "medium",
    assignee: "Lisa Wang",
    dueDate: "2024-01-25",
    projectId: "5",
    projectName: "Marketing Campaign",
    projectColor: "#8B5CF6",
  },
  {
    id: "6",
    title: "Code Review",
    description: "Review authentication module implementation",
    status: "inprogress",
    priority: "medium",
    assignee: "David Kim",
    dueDate: "2024-01-16",
    projectId: "2",
    projectName: "E-commerce Platform",
    projectColor: "#10B981",
  },
];

const columns = [
  { id: "todo", title: "To Do", icon: CircleDot },
  { id: "inprogress", title: "In Progress", icon: Clock },
  { id: "review", title: "Review", icon: AlertCircle },
  { id: "done", title: "Done", icon: CheckCircle },
];

function Kanban() {
  const { projects } = useProject();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Global Kanban Board
          </h1>
          <p className="text-gray-600 mt-1">
            View and manage tasks across all your projects
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {columns.map((column) => {
          const columnTasks = mockTasks.filter(
            (task) => task.status === column.id
          );
          return (
            <div
              key={column.id}
              className="bg-white p-4 rounded-lg border border-gray-200"
            >
              <div className="flex items-center">
                <column.icon className="h-5 w-5 text-gray-600 mr-2" />
                <span className="text-sm font-medium text-gray-900">
                  {column.title}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {columnTasks.length}
              </p>
            </div>
          );
        })}
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {columns.map((column) => {
          const columnTasks = mockTasks.filter(
            (task) => task.status === column.id
          );

          return (
            <div key={column.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <column.icon className="h-5 w-5 text-gray-600 mr-2" />
                  <h3 className="font-medium text-gray-900">{column.title}</h3>
                  <span className="ml-2 bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                    {columnTasks.length}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {columnTasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    {/* Project Tag */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: task.projectColor }}
                        ></div>
                        <span className="text-xs text-gray-600 font-medium">
                          {task.projectName}
                        </span>
                      </div>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                          task.priority
                        )}`}
                      >
                        {task.priority}
                      </span>
                    </div>

                    {/* Task Title */}
                    <h4 className="font-medium text-gray-900 mb-2">
                      {task.title}
                    </h4>

                    {/* Task Description */}
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {task.description}
                    </p>

                    {/* Task Meta */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        <span className="truncate">{task.assignee}</span>
                      </div>
                      <div
                        className={`flex items-center ${
                          isOverdue(task.dueDate) ? "text-red-600" : ""
                        }`}
                      >
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>
                          {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {columnTasks.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                      <column.icon className="h-6 w-6" />
                    </div>
                    <p className="text-sm">
                      No tasks in {column.title.toLowerCase()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Projects Quick Access */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Quick Access to Project Boards
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.slice(0, 6).map((project) => (
            <a
              key={project.id}
              href={`/dashboard/projects/${project.id}/board`}
              className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
                style={{ backgroundColor: project.color }}
              >
                <FolderOpen className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {project.name}
                </p>
                <p className="text-xs text-gray-500">
                  {project.tasksCompleted}/{project.totalTasks} tasks completed
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Kanban;
