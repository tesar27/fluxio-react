import { useProject } from "../../../contexts/ProjectContext";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  MoreVertical,
  Calendar,
  User,
  Flag,
  MessageSquare,
  Paperclip,
} from "lucide-react";

export default function ProjectBoard() {
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

  // Mock board data
  const boardColumns = [
    {
      id: "todo",
      title: "To Do",
      color: "gray",
      tasks: [
        {
          id: "1",
          title: "Design user interface mockups",
          description:
            "Create detailed mockups for the main dashboard and user profile pages",
          priority: "high",
          dueDate: "Jan 15",
          assignee: "Sarah Wilson",
          labels: ["Design", "UI/UX"],
          comments: 3,
          attachments: 2,
        },
        {
          id: "2",
          title: "Research competitor analysis",
          description: "Analyze top 5 competitors and document key features",
          priority: "medium",
          dueDate: "Jan 18",
          assignee: "Mike Johnson",
          labels: ["Research"],
          comments: 1,
          attachments: 0,
        },
        {
          id: "3",
          title: "Set up development environment",
          description: "Configure local development setup and CI/CD pipeline",
          priority: "low",
          dueDate: "Jan 20",
          assignee: "Alex Chen",
          labels: ["DevOps", "Setup"],
          comments: 0,
          attachments: 1,
        },
      ],
    },
    {
      id: "in-progress",
      title: "In Progress",
      color: "blue",
      tasks: [
        {
          id: "4",
          title: "Implement authentication system",
          description: "Build login, signup, and password reset functionality",
          priority: "high",
          dueDate: "Jan 16",
          assignee: "Alex Chen",
          labels: ["Backend", "Security"],
          comments: 5,
          attachments: 3,
        },
        {
          id: "5",
          title: "Create database schema",
          description: "Design and implement the main database structure",
          priority: "high",
          dueDate: "Jan 14",
          assignee: "Emma Davis",
          labels: ["Database"],
          comments: 2,
          attachments: 1,
        },
      ],
    },
    {
      id: "review",
      title: "Review",
      color: "yellow",
      tasks: [
        {
          id: "6",
          title: "API documentation",
          description: "Complete API documentation for all endpoints",
          priority: "medium",
          dueDate: "Jan 12",
          assignee: "Mike Johnson",
          labels: ["Documentation", "API"],
          comments: 4,
          attachments: 2,
        },
      ],
    },
    {
      id: "done",
      title: "Done",
      color: "green",
      tasks: [
        {
          id: "7",
          title: "Project planning and setup",
          description: "Initial project setup and team onboarding",
          priority: "high",
          dueDate: "Jan 8",
          assignee: "Sarah Wilson",
          labels: ["Planning"],
          comments: 8,
          attachments: 5,
        },
        {
          id: "8",
          title: "Requirements gathering",
          description: "Collect and document all project requirements",
          priority: "high",
          dueDate: "Jan 10",
          assignee: "Sarah Wilson",
          labels: ["Planning", "Requirements"],
          comments: 6,
          attachments: 3,
        },
      ],
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "low":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(`/dashboard/projects/${project.id}`)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {project.name} - Board
              </h1>
              <p className="text-gray-600 mt-1">
                Manage tasks with a Kanban-style board
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors">
              <MoreVertical className="h-4 w-4" />
              <span>Board Options</span>
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors">
              <Plus className="h-4 w-4" />
              <span>Add Task</span>
            </button>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[600px]">
        {boardColumns.map((column) => (
          <div key={column.id} className="bg-gray-50 rounded-lg p-4">
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full bg-${column.color}-500`}
                ></div>
                <h3 className="font-semibold text-gray-900">{column.title}</h3>
                <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded-full">
                  {column.tasks.length}
                </span>
              </div>
              <button className="p-1 hover:bg-gray-200 rounded">
                <Plus className="h-4 w-4 text-gray-600" />
              </button>
            </div>

            {/* Tasks */}
            <div className="space-y-3">
              {column.tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-sm transition-shadow cursor-pointer group"
                >
                  {/* Task Header */}
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 text-sm leading-5">
                      {task.title}
                    </h4>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded">
                      <MoreVertical className="h-3 w-3 text-gray-400" />
                    </button>
                  </div>

                  {/* Task Description */}
                  {task.description && (
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                      {task.description}
                    </p>
                  )}

                  {/* Labels */}
                  {task.labels.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {task.labels.map((label, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Task Metadata */}
                  <div className="space-y-2">
                    {/* Priority and Due Date */}
                    <div className="flex items-center justify-between text-xs">
                      <span
                        className={`px-2 py-1 rounded-full font-medium ${getPriorityColor(
                          task.priority
                        )}`}
                      >
                        {task.priority}
                      </span>
                      <div className="flex items-center text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{task.dueDate}</span>
                      </div>
                    </div>

                    {/* Assignee and Stats */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-gray-600">
                        <User className="h-3 w-3 mr-1" />
                        <span>{task.assignee}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        {task.comments > 0 && (
                          <div className="flex items-center">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            <span>{task.comments}</span>
                          </div>
                        )}
                        {task.attachments > 0 && (
                          <div className="flex items-center">
                            <Paperclip className="h-3 w-3 mr-1" />
                            <span>{task.attachments}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add Task Button */}
              <button className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-white transition-colors text-gray-600 hover:text-gray-700 text-sm">
                <Plus className="h-4 w-4 inline mr-2" />
                Add a task
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Board Stats */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Board Statistics
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {boardColumns.reduce((sum, col) => sum + col.tasks.length, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Tasks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {boardColumns.find((col) => col.id === "done")?.tasks.length || 0}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {boardColumns.find((col) => col.id === "in-progress")?.tasks
                .length || 0}
            </div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {boardColumns.find((col) => col.id === "review")?.tasks.length ||
                0}
            </div>
            <div className="text-sm text-gray-600">In Review</div>
          </div>
        </div>
      </div>
    </div>
  );
}
