import {
  Kanban,
  FileText,
  MessageSquare,
  Clock,
  BarChart,
  Shield,
  Smartphone,
  Zap,
  Users,
} from "lucide-react";

const features = [
  {
    icon: Kanban,
    title: "Kanban Boards",
    description:
      "Visual project management with drag-and-drop functionality. Organize tasks in customizable columns.",
  },
  {
    icon: FileText,
    title: "Rich Documentation",
    description:
      "Create beautiful docs with blocks, tables, and multimedia. Keep everything organized in one place.",
  },
  {
    icon: MessageSquare,
    title: "Real-time Chat",
    description:
      "Communicate with your team instantly. Thread conversations and share files seamlessly.",
  },
  {
    icon: Clock,
    title: "Time Tracking",
    description:
      "Track time spent on tasks automatically. Generate detailed reports for billing and analysis.",
  },
  {
    icon: BarChart,
    title: "Advanced Analytics",
    description:
      "Gain insights with powerful dashboards. Track team performance and project metrics.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-level security with SSO, 2FA, and compliance certifications. Your data is safe.",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description:
      "Stay productive on the go with native iOS and Android apps. Sync across all devices.",
  },
  {
    icon: Zap,
    title: "Automation",
    description:
      "Automate repetitive tasks with custom workflows. Save time and reduce manual work.",
  },
  {
    icon: Users,
    title: "Team Management",
    description:
      "Manage permissions, roles, and access levels. Scale your team collaboration effortlessly.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything you need to manage projects
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            FluxIO brings together all the tools your team needs in one
            powerful, intuitive platform. From planning to execution, we've got
            you covered.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <feature.icon size={24} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to transform your workflow?
            </h3>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of teams who have already made the switch to FluxIO
              and experienced unprecedented productivity gains.
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors">
              Start Your Free Trial
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
