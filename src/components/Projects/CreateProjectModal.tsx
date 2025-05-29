import { useState } from "react";
import { useProject } from "../../contexts/ProjectContext";
import { X, Folder, Calendar, Users, Target } from "lucide-react";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const projectColors = [
  "#3B82F6", // Blue
  "#10B981", // Green
  "#F59E0B", // Yellow
  "#EF4444", // Red
  "#8B5CF6", // Purple
  "#06B6D4", // Cyan
  "#84CC16", // Lime
  "#F97316", // Orange
  "#EC4899", // Pink
  "#6B7280", // Gray
];

const projectStatuses = [
  "Planning",
  "In Progress",
  "Review",
  "On Hold",
] as const;

export default function CreateProjectModal({
  isOpen,
  onClose,
}: CreateProjectModalProps) {
  const { createProject } = useProject();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    dueDate: "",
    status: "Planning" as const,
    team: 1,
    totalTasks: 0,
    color: projectColors[0],
    owner: "Current User",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = "Project name is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Project description is required";
    }
    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required";
    }
    if (formData.team < 1) {
      newErrors.team = "Team size must be at least 1";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Create project
      createProject({
        ...formData,
        progress: 0,
        health: "On Track",
        tasksCompleted: 0,
      });

      // Reset form and close modal
      setFormData({
        name: "",
        description: "",
        dueDate: "",
        status: "Planning",
        team: 1,
        totalTasks: 0,
        color: projectColors[0],
        owner: "Current User",
      });
      setErrors({});
      onClose();
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>

        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <Folder className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Create New Project
                    </h3>
                    <p className="text-sm text-gray-500">
                      Set up a new project to start organizing your work
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Project Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Project Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                      errors.name
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                    placeholder="Enter project name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                {/* Project Description */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description *
                  </label>
                  <textarea
                    id="description"
                    rows={3}
                    value={formData.description}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                      errors.description
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                    placeholder="Describe your project"
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.description}
                    </p>
                  )}
                </div>

                {/* Due Date */}
                <div>
                  <label
                    htmlFor="dueDate"
                    className="flex items-center text-sm font-medium text-gray-700"
                  >
                    <Calendar className="h-4 w-4 mr-1" />
                    Due Date *
                  </label>
                  <input
                    type="date"
                    id="dueDate"
                    value={formData.dueDate}
                    onChange={(e) => handleChange("dueDate", e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                      errors.dueDate
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                  />
                  {errors.dueDate && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.dueDate}
                    </p>
                  )}
                </div>

                {/* Status and Team Size Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="status"
                      className="flex items-center text-sm font-medium text-gray-700"
                    >
                      <Target className="h-4 w-4 mr-1" />
                      Status
                    </label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => handleChange("status", e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                      {projectStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="team"
                      className="flex items-center text-sm font-medium text-gray-700"
                    >
                      <Users className="h-4 w-4 mr-1" />
                      Team Size
                    </label>
                    <input
                      type="number"
                      id="team"
                      min="1"
                      value={formData.team}
                      onChange={(e) =>
                        handleChange("team", parseInt(e.target.value) || 1)
                      }
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                        errors.team
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                          : ""
                      }`}
                    />
                    {errors.team && (
                      <p className="mt-1 text-sm text-red-600">{errors.team}</p>
                    )}
                  </div>
                </div>

                {/* Project Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Color
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {projectColors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => handleChange("color", color)}
                        className={`w-8 h-8 rounded-full border-2 ${
                          formData.color === color
                            ? "border-gray-400"
                            : "border-gray-200"
                        } hover:border-gray-400 transition-colors`}
                        style={{ backgroundColor: color }}
                      >
                        {formData.color === color && (
                          <div className="w-full h-full rounded-full border-2 border-white"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="submit"
                className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Create Project
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
