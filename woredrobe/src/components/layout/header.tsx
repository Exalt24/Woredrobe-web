'use client'

import Link from 'next/link'
import { useAuth } from '@/components/providers/auth-provider'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export function Header() {
  const { user, signOut } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <span className="font-bold text-xl gradient-text">WOREDROBE</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {user ? (
              <>
                <Link href="/feed" className="nav-link">
                  Feed
                </Link>
                <Link href="/upload" className="nav-link">
                  Upload
                </Link>
                <Link href="/profile" className="nav-link">
                  Profile
                </Link>
                <Button variant="ghost" onClick={signOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/feed" className="nav-link">
                  Explore
                </Link>
                <Link href="/auth/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/auth/register">
                  <Button variant="primary">Join</Button>
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              {user ? (
                <>
                  <Link href="/feed" className="nav-link">
                    Feed
                  </Link>
                  <Link href="/upload" className="nav-link">
                    Upload
                  </Link>
                  <Link href="/profile" className="nav-link">
                    Profile
                  </Link>
                  <Button variant="ghost" onClick={signOut} className="justify-start">
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/feed" className="nav-link">
                    Explore
                  </Link>
                  <Link href="/auth/login" className="nav-link">
                    Sign In
                  </Link>
                  <Link href="/auth/register">
                    <Button variant="primary" className="w-full">Join</Button>
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}