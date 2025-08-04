import { requireAuth } from '@/lib/auth/session'
import { Header } from '@/components/layout/header'

export default async function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAuth() // This handles the redirect
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} />
      <main className="pb-16">{children}</main>
    </div>
  )
}