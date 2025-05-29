import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export interface Project {
  id: string;
  name: string;
  description: string;
  progress: number;
  dueDate: string;
  status: "Planning" | "In Progress" | "Review" | "Completed" | "On Hold";
  health: "On Track" | "At Risk" | "Critical";
  team: number;
  tasksCompleted: number;
  totalTasks: number;
  color: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

interface ProjectContextType {
  projects: Project[];
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  createProject: (
    project: Omit<Project, "id" | "createdAt" | "updatedAt">
  ) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
};

interface ProjectProviderProps {
  children: ReactNode;
}

export const ProjectProvider: React.FC<ProjectProviderProps> = ({
  children,
}) => {
  // Mock data for now - this will be replaced with Supabase data later
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "Website Redesign",
      description:
        "Complete overhaul of the company website with modern design and improved UX",
      progress: 75,
      dueDate: "Jan 15, 2025",
      status: "In Progress",
      health: "On Track",
      team: 4,
      tasksCompleted: 12,
      totalTasks: 16,
      color: "blue",
      owner: "Sarah Wilson",
      createdAt: "2024-12-01",
      updatedAt: "2024-12-28",
    },
    {
      id: "2",
      name: "Mobile App Development",
      description: "Native mobile application for iOS and Android platforms",
      progress: 30,
      dueDate: "Feb 28, 2025",
      status: "Planning",
      health: "On Track",
      team: 6,
      tasksCompleted: 8,
      totalTasks: 25,
      color: "green",
      owner: "Mike Johnson",
      createdAt: "2024-11-15",
      updatedAt: "2024-12-25",
    },
    {
      id: "3",
      name: "API Integration",
      description: "Integration with third-party APIs and internal services",
      progress: 90,
      dueDate: "Jan 10, 2025",
      status: "Review",
      health: "At Risk",
      team: 3,
      tasksCompleted: 18,
      totalTasks: 20,
      color: "purple",
      owner: "Alex Chen",
      createdAt: "2024-11-01",
      updatedAt: "2024-12-27",
    },
    {
      id: "4",
      name: "Database Migration",
      description: "Migration from legacy database to modern cloud solution",
      progress: 45,
      dueDate: "Jan 20, 2025",
      status: "In Progress",
      health: "Critical",
      team: 2,
      tasksCompleted: 9,
      totalTasks: 20,
      color: "red",
      owner: "Emma Davis",
      createdAt: "2024-10-15",
      updatedAt: "2024-12-26",
    },
    {
      id: "5",
      name: "Security Audit",
      description:
        "Comprehensive security review and implementation of best practices",
      progress: 15,
      dueDate: "Mar 15, 2025",
      status: "Planning",
      health: "On Track",
      team: 3,
      tasksCompleted: 3,
      totalTasks: 20,
      color: "orange",
      owner: "David Kim",
      createdAt: "2024-12-10",
      updatedAt: "2024-12-20",
    },
  ]);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const createProject = (
    projectData: Omit<Project, "id" | "createdAt" | "updatedAt">
  ) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };
    setProjects((prev) => [...prev, newProject]);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id
          ? {
              ...project,
              ...updates,
              updatedAt: new Date().toISOString().split("T")[0],
            }
          : project
      )
    );
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
    if (selectedProject?.id === id) {
      setSelectedProject(null);
    }
  };

  const value: ProjectContextType = {
    projects,
    selectedProject,
    setSelectedProject,
    createProject,
    updateProject,
    deleteProject,
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};
