import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProjectProvider } from "./contexts/ProjectContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Landing Page Components
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";

// Auth Pages
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AuthCallback from "./pages/AuthCallback";
import SetupPassword from "./pages/SetupPassword";
import Dashboard from "./pages/Dashboard";

// App Pages

// Landing Page Component
function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Features />
      <Pricing />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProjectProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth/signup" element={<SignUp />} />
            <Route path="/auth/signin" element={<SignIn />} />
            <Route path="/auth/callback" element={<AuthCallback />} />

            {/* Protected Routes */}
            <Route
              path="/auth/setup-password"
              element={
                <ProtectedRoute>
                  <SetupPassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Catch all route - redirect to landing */}
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </ProjectProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
