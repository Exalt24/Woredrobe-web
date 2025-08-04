import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/components/providers/auth-provider'
import { Header } from '@/components/layout/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Woredrobe',
  keywords: ['fashion', 'sustainable fashion', 'outfit tracker', 'wardrobe management'],
  description: 'Document and celebrate the outfits you actually wear. Join the anti-fast fashion community.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="pb-16">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}