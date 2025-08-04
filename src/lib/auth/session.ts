import { createServerSupabaseClientReadOnly } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { cache } from 'react'

export const getServerUser = cache(async () => {
  const supabase = await createServerSupabaseClientReadOnly()
  const { data: { session } } = await supabase.auth.getSession()
  return session?.user ?? null
})

// New helper that guarantees a user or redirects
export const requireAuth = cache(async () => {
  const user = await getServerUser()
  if (!user) {
    redirect('/auth/login')
  }
  return user // TypeScript knows this is User, not User | null
})