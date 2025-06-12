import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Handle the OAuth callback
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error("Auth callback error:", error);
          setStatus("error");
          setMessage(error.message);
          return;
        }

        if (data.session) {
          const { user } = data.session;

          setStatus("success");
          setMessage("Successfully signed in! Redirecting...");

          // Check user's identities to determine if this is OAuth
          const identities = user.identities || [];
          const hasOAuthIdentity = identities.some((identity) =>
            ["google", "github"].includes(identity.provider)
          );

          // Check if user has multiple identities (linked accounts)
          const hasMultipleIdentities = identities.length > 1;

          // Check if user already has a password set (existing email account)
          const hasPassword = identities.some(
            (identity) => identity.provider === "email"
          );

          console.log("User identities:", identities);
          console.log("Has OAuth identity:", hasOAuthIdentity);
          console.log("Has multiple identities:", hasMultipleIdentities);
          console.log("Has password:", hasPassword);

          // Determine where to redirect
          if (
            hasOAuthIdentity &&
            !hasPassword &&
            !user.user_metadata?.password_set
          ) {
            // New OAuth user - can go directly to dashboard (no password needed)
            setTimeout(() => navigate("/dashboard"), 2000);
          } else if (hasOAuthIdentity && hasPassword) {
            // OAuth user with linked email account - go to dashboard
            setTimeout(() => navigate("/dashboard"), 2000);
          } else if (!hasPassword && !user.user_metadata?.password_set) {
            // Magic link user without password - redirect to setup
            setTimeout(() => navigate("/auth/setup-password"), 2000);
          } else {
            // Default - go to dashboard
            setTimeout(() => navigate("/dashboard"), 2000);
          }
        } else {
          setStatus("error");
          setMessage("No session found. Please try signing in again.");
        }
      } catch (err) {
        console.error("Auth callback unexpected error:", err);
        setStatus("error");
        setMessage("An unexpected error occurred. Please try again.");
      }
    };

    handleAuthCallback();
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            {status === "loading" && (
              <>
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
                  <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Signing you in...
                </h2>
                <p className="text-gray-600">
                  Please wait while we complete your authentication.
                </p>
              </>
            )}

            {status === "success" && (
              <>
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Welcome to FluxIO!
                </h2>
                <p className="text-gray-600">{message}</p>
              </>
            )}

            {status === "error" && (
              <>
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                  <XCircle className="h-8 w-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Authentication failed
                </h2>
                <p className="text-gray-600 mb-6">{message}</p>
                <div className="space-y-4">
                  <button
                    onClick={() => navigate("/auth/signin")}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Try signing in again
                  </button>
                  <button
                    onClick={() => navigate("/")}
                    className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Go to homepage
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
