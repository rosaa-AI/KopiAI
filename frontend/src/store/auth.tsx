import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { supabase } from '../lib/supabase'
import { db } from '../lib/db'
import type { User } from '@supabase/supabase-js'

interface AppUser {
  id: string
  name: string
  email: string
  store: string
  avatar_url: string
  location: string
}

interface AuthContextType {
  user: AppUser | null
  supabaseUser: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<{ success: boolean; message?: string }>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [supabaseUser, setSupabaseUser] = useState<User | null>(null)
  const [user, setUser] = useState<AppUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const loadProfile = useCallback(async (uid: string, email: string) => {
    try {
      const profile = await db.getUserProfile(uid)
      setUser({ ...profile, id: uid, email: profile.email || email })
    } catch {
      // First login — profile not yet created
      setUser({
        id: uid,
        name: email.split('@')[0],
        email,
        store: '',
        avatar_url: '',
        location: '',
      })
    }
  }, [])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setSupabaseUser(session.user)
        loadProfile(session.user.id, session.user.email || '')
      }
      setIsLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setSupabaseUser(session.user)
        loadProfile(session.user.id, session.user.email || '')
      } else {
        setSupabaseUser(null)
        setUser(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [loadProfile])

  const login = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return { success: false, message: error.message }
    if (data.user) {
      await loadProfile(data.user.id, data.user.email || '')
      return { success: true }
    }
    return { success: false, message: 'Login gagal' }
  }, [loadProfile])

  const register = useCallback(async (name: string, email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) return { success: false, message: error.message }
    if (data.user) {
      // Create user profile
      await db.upsertProfile(data.user.id, {
        name,
        email,
        store: '',
        location: '',
      })
      return { success: true }
    }
    return { success: false, message: 'Gagal mendaftar' }
  }, [])

  const logout = useCallback(async () => {
    await supabase.auth.signOut()
    setUser(null)
    setSupabaseUser(null)
  }, [])

  const resetPassword = useCallback(async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    })
    if (error) return { success: false, message: error.message }
    return { success: true }
  }, [])

  const refreshProfile = useCallback(async () => {
    if (supabaseUser) {
      await loadProfile(supabaseUser.id, supabaseUser.email || '')
    }
  }, [supabaseUser, loadProfile])

  return (
    <AuthContext.Provider value={{
      user, supabaseUser, isLoading,
      login, register, logout, resetPassword, refreshProfile,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
