import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    // Enable account linking for same email addresses
    flowType: 'pkce',
    // Ensure proper session handling for OAuth
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    storageKey: 'supabase.auth.token',
    // Additional security settings
    debug: process.env.NODE_ENV === 'development'
  }
})

// Auth helper functions
export const auth = {
  // Sign up with magic link
  signUpWithMagicLink: async (email: string, redirectTo?: string) => {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo || `${window.location.origin}/auth/callback`
      }
    })
    return { data, error }
  },

  // Sign in with magic link
  signInWithMagicLink: async (email: string, redirectTo?: string) => {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo || `${window.location.origin}/auth/callback`
      }
    })
    return { data, error }
  },

  // Sign in with email and password
  signInWithPassword: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Get current session
  getSession: async () => {
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  },

  // Get current user
  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  // Update user password
  updatePassword: async (password: string) => {
    const { data, error } = await supabase.auth.updateUser({
      password
    })
    return { data, error }
  },

  // Reset password
  resetPassword: async (email: string, redirectTo?: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectTo || `${window.location.origin}/auth/reset-password`
    })
    return { data, error }
  },

  // Sign in with Google
  signInWithGoogle: async (redirectTo?: string) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectTo || `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        // Skip confirmation for linking accounts with same email
        skipBrowserRedirect: false
      }
    })
    return { data, error }
  },

  // Sign in with GitHub
  signInWithGitHub: async (redirectTo?: string) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: redirectTo || `${window.location.origin}/auth/callback`,
        // Skip confirmation for linking accounts with same email
        skipBrowserRedirect: false
      }
    })
    return { data, error }
  },

  // Link OAuth identity to existing account
  linkIdentity: async (provider: 'google' | 'github') => {
    const { data, error } = await supabase.auth.linkIdentity({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
    return { data, error }
  },

  // Get all identities for current user
  getUserIdentities: async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error || !user) return { identities: [], error }
    
    return { 
      identities: user.identities || [], 
      error: null 
    }
  }
}
