import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { toast } from '@/hooks/use-toast'
import { Session, User as SupabaseUser } from '@supabase/supabase-js'

export type Role = 'customer' | 'admin'

export interface User {
  id: string
  email: string
  role: Role
}

interface AuthContextValue {
  user: User | null
  loading: boolean
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchRole = async (u: SupabaseUser) => {
    const { data } = await supabase.from('users').select('role').eq('id', u.id).single()
    const role = (data?.role ?? 'customer') as Role
    setUser({ id: u.id, email: u.email ?? '', role })
  }

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession()
      const sessionUser = data.session?.user
      if (sessionUser) await fetchRole(sessionUser)
      setLoading(false)
    }
    init()
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user
      if (u) void fetchRole(u)
      else setUser(null)
    })
    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error || !data.user) {
      toast({ title: 'Sign up failed', description: error?.message })
      throw error || new Error('No user returned')
    }
    await supabase.from('users').insert({ id: data.user.id, role: 'customer' })
    await fetchRole(data.user)
    toast({ title: 'Account created' })
  }

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error || !data.user) {
      toast({ title: 'Login failed', description: error?.message })
      throw error || new Error('No user')
    }
    await fetchRole(data.user)
    toast({ title: 'Logged in' })
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  const value = { user, loading, signUp, signIn, signOut }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
