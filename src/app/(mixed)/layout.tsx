import { getServerUser } from '@/lib/auth/session'
import { Header } from '@/components/layout/header'

export default async function MixedLayout({ children }: { children: React.ReactNode }) {
  const user = await getServerUser()
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} />
      <main className="pb-16">{children}</main>
    </div>
  )
}