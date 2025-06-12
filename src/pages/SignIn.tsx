import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  ArrowLeft,
  CheckCircle,
  Loader2,
  Eye,
  EyeOff,
  Github,
} from "lucide-react";
import { auth } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";

export default function SignIn() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [mode, setMode] = useState<"magic-link" | "password">("magic-link");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect to dashboard if user is already authenticated
  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError(null);

    try {
      const { error } = await auth.signInWithMagicLink(email);

      if (error) {
        setError(error.message);
      } else {
        setSent(true);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setError(null);

    try {
      const { error } = await auth.signInWithPassword(email, password);

      if (error) {
        setError(error.message);
      } else {
        // Successful sign-in, redirect to dashboard
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await auth.signInWithGoogle();

      if (error) {
        // Provide more specific error messages
        if (error.message.includes("email_not_confirmed")) {
          setError("Please confirm your email address before signing in.");
        } else if (error.message.includes("invalid_credentials")) {
          setError("Invalid credentials. Please try again.");
        } else {
          setError(error.message);
        }
        setLoading(false);
        return;
      }

      // Success - OAuth will redirect via callback
      // Don't set loading to false here as redirect is happening
    } catch (err) {
      setError("Failed to sign in with Google. Please try again.");
      setLoading(false);
    }
  };

  const handleGitHubSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await auth.signInWithGitHub();

      if (error) {
        // Provide more specific error messages
        if (error.message.includes("email_not_confirmed")) {
          setError("Please confirm your email address before signing in.");
        } else if (error.message.includes("invalid_credentials")) {
          setError("Invalid credentials. Please try again.");
        } else {
          setError(error.message);
        }
        setLoading(false);
        return;
      }

      // Success - OAuth will redirect via callback
      // Don't set loading to false here as redirect is happening
    } catch (err) {
      setError("Failed to sign in with GitHub. Please try again.");
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Check your email
              </h2>
              <p className="text-gray-600 mb-6">
                We've sent a magic link to <strong>{email}</strong>
              </p>
              <p className="text-sm text-gray-500 mb-8">
                Click the link in your email to sign in. The link will expire in
                1 hour.
              </p>
              <div className="space-y-4">
                <button
                  onClick={() => {
                    setSent(false);
                    setEmail("");
                  }}
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Try a different email
                </button>
                <Link
                  to="/auth/signup"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Don't have an account? Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to your FluxIO account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Sign-in method toggle */}
          <div className="flex rounded-lg bg-gray-100 p-1 mb-6">
            <button
              onClick={() => setMode("magic-link")}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                mode === "magic-link"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Magic Link
            </button>
            <button
              onClick={() => setMode("password")}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                mode === "password"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Password
            </button>
          </div>

          <form
            className="space-y-6"
            onSubmit={
              mode === "magic-link" ? handleMagicLink : handlePasswordSignIn
            }
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1 relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your email"
                />
                <Mail className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {mode === "password" && (
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm pr-10"
                    placeholder="Enter your password"
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
            )}

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-800">{error}</div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={
                  loading || !email || (mode === "password" && !password)
                }
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                    {mode === "magic-link"
                      ? "Sending magic link..."
                      : "Signing in..."}
                  </>
                ) : mode === "magic-link" ? (
                  "Send magic link"
                ) : (
                  "Sign in"
                )}
              </button>
            </div>

            {mode === "password" && (
              <div className="text-center">
                <Link
                  to="/auth/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </Link>
              </div>
            )}
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="ml-2">Google</span>
              </button>

              <button
                onClick={handleGitHubSignIn}
                disabled={loading}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Github className="w-5 h-5" />
                <span className="ml-2">GitHub</span>
              </button>
            </div>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  New to FluxIO?
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Link
              to="/auth/signup"
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create your account
            </Link>
          </div>

          <div className="mt-6">
            <Link
              to="/"
              className="flex items-center justify-center text-sm text-gray-600 hover:text-blue-600"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
