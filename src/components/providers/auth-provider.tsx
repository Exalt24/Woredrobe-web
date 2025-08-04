'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/toast'
import { User } from '@supabase/supabase-js'

interface MinimalAuthContextType {
  user: User | null
  signOut: () => Promise<void>
  // No loading state needed - we start with server data
}

const MinimalAuthContext = createContext<MinimalAuthContextType>({
  user: null,
  signOut: async () => {},
})

// Only use this hook for signOut - components should get user via props
export const useMinimalAuth = () => {
  const context = useContext(MinimalAuthContext)
  if (!context) {
    throw new Error('useMinimalAuth must be used within MinimalAuthProvider')
  }
  return context
}

export const useUser = () => {
  const { user } = useMinimalAuth()
  return user
}

interface MinimalAuthProviderProps {
  children: React.ReactNode
  initialUser: User | null
}

export function MinimalAuthProvider({ children, initialUser }: MinimalAuthProviderProps) {
  const [user, setUser] = useState<User | null>(initialUser)
  const supabase = createClient()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Only listen for auth changes - no initial fetch needed
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      toast.success("You've been signed out successfully")
      router.push('/')
    } catch (error) {
      toast.error("Failed to sign out", "Error")
    }
  }

  return (
    <MinimalAuthContext.Provider value={{ user, signOut }}>
      {children}
    </MinimalAuthContext.Provider>
  )
}