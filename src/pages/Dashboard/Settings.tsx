import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { auth } from "../../lib/supabase";
import {
  User,
  Mail,
  Shield,
  Link as LinkIcon,
  Unlink,
  Github,
  Check,
  AlertCircle,
  Loader2,
} from "lucide-react";

interface Identity {
  id: string;
  provider: string;
  email: string;
  created_at: string;
}

export default function Settings() {
  const { user } = useAuth();
  const [identities, setIdentities] = useState<Identity[]>([]);
  const [loading, setLoading] = useState(true);
  const [linkingProvider, setLinkingProvider] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadUserIdentities();
  }, []);

  const loadUserIdentities = async () => {
    try {
      const { identities } = await auth.getUserIdentities();
      setIdentities(identities as Identity[]);
    } catch (err) {
      setError("Failed to load account information");
    } finally {
      setLoading(false);
    }
  };

  const handleLinkAccount = async (provider: "google" | "github") => {
    setLinkingProvider(provider);
    setError(null);
    setSuccess(null);

    try {
      const { error } = await auth.linkIdentity(provider);

      if (error) {
        setError(`Failed to link ${provider} account: ${error.message}`);
      } else {
        setSuccess(
          `${provider} account linking initiated. Please complete the process in the popup window.`
        );
      }
    } catch (err) {
      setError(`Failed to link ${provider} account. Please try again.`);
    } finally {
      setLinkingProvider(null);
    }
  };

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case "google":
        return (
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
        );
      case "github":
        return <Github className="w-5 h-5" />;
      case "email":
        return <Mail className="w-5 h-5" />;
      default:
        return <User className="w-5 h-5" />;
    }
  };

  const getProviderName = (provider: string) => {
    switch (provider) {
      case "google":
        return "Google";
      case "github":
        return "GitHub";
      case "email":
        return "Email";
      default:
        return provider.charAt(0).toUpperCase() + provider.slice(1);
    }
  };

  const hasProvider = (provider: string) => {
    return identities.some((identity) => identity.provider === provider);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-600 mt-2">
          Manage your account preferences and security settings
        </p>
      </div>

      {/* Alerts */}
      {error && (
        <div className="mb-6 rounded-md bg-red-50 p-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div className="mb-6 rounded-md bg-green-50 p-4">
          <div className="flex">
            <Check className="h-5 w-5 text-green-400" />
            <div className="ml-3">
              <p className="text-sm text-green-800">{success}</p>
            </div>
          </div>
        </div>
      )}

      {/* Account Information */}
      <div className="bg-white shadow rounded-lg mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            Account Information
          </h2>
        </div>
        <div className="px-6 py-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <p className="mt-1 text-sm text-gray-900">{user?.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                User ID
              </label>
              <p className="mt-1 text-sm text-gray-500 font-mono">{user?.id}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Connected Accounts */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            Connected Accounts
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Link your social accounts for easier sign-in
          </p>
        </div>
        <div className="px-6 py-4">
          <div className="space-y-4">
            {/* Current Identities */}
            {identities.map((identity) => (
              <div
                key={identity.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {getProviderIcon(identity.provider)}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {getProviderName(identity.provider)}
                    </p>
                    <p className="text-sm text-gray-500">{identity.email}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm text-green-600 font-medium">
                    Connected
                  </span>
                </div>
              </div>
            ))}

            {/* Available Providers to Link */}
            {!hasProvider("google") && (
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {getProviderIcon("google")}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Google</p>
                    <p className="text-sm text-gray-500">
                      Link your Google account
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleLinkAccount("google")}
                  disabled={linkingProvider === "google"}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {linkingProvider === "google" ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <LinkIcon className="h-4 w-4 mr-2" />
                  )}
                  Link Account
                </button>
              </div>
            )}

            {!hasProvider("github") && (
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {getProviderIcon("github")}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">GitHub</p>
                    <p className="text-sm text-gray-500">
                      Link your GitHub account
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleLinkAccount("github")}
                  disabled={linkingProvider === "github"}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {linkingProvider === "github" ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <LinkIcon className="h-4 w-4 mr-2" />
                  )}
                  Link Account
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
