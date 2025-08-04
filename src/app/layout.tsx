import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { MinimalAuthProvider } from '@/components/providers/auth-provider'
import { ToastProvider, Toaster } from '@/components/ui/toast'
import { getServerUser } from '@/lib/auth/session'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Woredrobe',
  keywords: ['fashion', 'sustainable fashion', 'outfit tracker', 'wardrobe management'],
  description: 'Document and celebrate the outfits you actually wear. Join the anti-fast fashion community.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getServerUser() // Now using cached helper
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>
          <MinimalAuthProvider initialUser={user}>
            {children}
            <Toaster />
          </MinimalAuthProvider>
        </ToastProvider>
      </body>
    </html>
  )
}