import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, CheckCircle, Loader2 } from "lucide-react";
import { auth } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";

export default function SetupPassword() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Password validation
  const passwordRequirements = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const isPasswordValid = Object.values(passwordRequirements).every(Boolean);
  const passwordsMatch = password === confirmPassword && password.length > 0;

  const handleSetupPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPasswordValid || !passwordsMatch) {
      setError(
        "Please ensure your password meets all requirements and passwords match."
      );
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error } = await auth.updatePassword(password);

      if (error) {
        setError(error.message);
      } else {
        // Redirect to dashboard after successful password setup
        navigate("/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    navigate("/auth/signin");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">F</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Set up your password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Welcome to FluxIO, {user.email}! <br />
          Please create a secure password for your account.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSetupPassword}>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm pr-10"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm pr-10"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Password Requirements */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">
                Password must contain:
              </p>
              <div className="space-y-1">
                {Object.entries({
                  "At least 8 characters": passwordRequirements.minLength,
                  "One uppercase letter": passwordRequirements.hasUppercase,
                  "One lowercase letter": passwordRequirements.hasLowercase,
                  "One number": passwordRequirements.hasNumber,
                  "One special character": passwordRequirements.hasSpecial,
                }).map(([requirement, met]) => (
                  <div key={requirement} className="flex items-center text-sm">
                    <CheckCircle
                      className={`h-4 w-4 mr-2 ${
                        met ? "text-green-500" : "text-gray-300"
                      }`}
                    />
                    <span className={met ? "text-green-700" : "text-gray-500"}>
                      {requirement}
                    </span>
                  </div>
                ))}
                <div className="flex items-center text-sm">
                  <CheckCircle
                    className={`h-4 w-4 mr-2 ${
                      passwordsMatch ? "text-green-500" : "text-gray-300"
                    }`}
                  />
                  <span
                    className={
                      passwordsMatch ? "text-green-700" : "text-gray-500"
                    }
                  >
                    Passwords match
                  </span>
                </div>
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-800">{error}</div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading || !isPasswordValid || !passwordsMatch}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                    Setting up password...
                  </>
                ) : (
                  "Complete setup"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
