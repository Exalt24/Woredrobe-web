'use client'
import Link from 'next/link'
import { useMinimalAuth } from '@/components/providers/auth-provider'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import { Bell, Settings, Upload, Users, Compass, Home } from 'lucide-react'

interface HeaderProps {
  user: User | null // Server user from layout
}

export function Header({ user: serverUser }: HeaderProps) {
  const { user: contextUser, signOut } = useMinimalAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Use server user initially, then context user for real-time updates
  const currentUser = mounted ? contextUser : serverUser

  const handleSignOut = async () => {
    await signOut()
    setIsMenuOpen(false)
  }

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
          <nav className="hidden md:flex items-center space-x-6">
            {currentUser ? (
              <>
                <Link href="/feed" className="nav-link flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Feed
                </Link>
                <Link href="/explore" className="nav-link flex items-center gap-2">
                  <Compass className="w-4 h-4" />
                  Explore
                </Link>
                <Link href="/upload" className="nav-link flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload
                </Link>
                <Link href="/profile" className="nav-link flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Profile
                </Link>
                
                {/* User Menu Dropdown Area */}
                <div className="flex items-center space-x-2">
                  <Link href="/notifications">
                    <Button variant="ghost" size="sm" className="p-2">
                      <Bell className="w-5 h-5" />
                    </Button>
                  </Link>
                  <Link href="/settings">
                    <Button variant="ghost" size="sm" className="p-2">
                      <Settings className="w-5 h-5" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" onClick={handleSignOut}>
                    Sign Out
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link href="/explore" className="nav-link">
                  Explore
                </Link>
                <Link href="/feed" className="nav-link">
                  Community
                </Link>
                <Link href="/auth/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="bg-primary-600 hover:bg-primary-700">Join WOREDROBE</Button>
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white">
            <nav className="flex flex-col space-y-3">
              {currentUser ? (
                <>
                  <Link 
                    href="/feed" 
                    className="nav-link flex items-center gap-3 px-2 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Home className="w-5 h-5" />
                    Feed
                  </Link>
                  <Link 
                    href="/explore" 
                    className="nav-link flex items-center gap-3 px-2 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Compass className="w-5 h-5" />
                    Explore
                  </Link>
                  <Link 
                    href="/upload" 
                    className="nav-link flex items-center gap-3 px-2 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Upload className="w-5 h-5" />
                    Upload Story
                  </Link>
                  <Link 
                    href="/profile" 
                    className="nav-link flex items-center gap-3 px-2 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Users className="w-5 h-5" />
                    Profile
                  </Link>
                  
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <Link 
                      href="/notifications" 
                      className="nav-link flex items-center gap-3 px-2 py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Bell className="w-5 h-5" />
                      Notifications
                    </Link>
                    <Link 
                      href="/settings" 
                      className="nav-link flex items-center gap-3 px-2 py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Settings className="w-5 h-5" />
                      Settings
                    </Link>
                    <Button 
                      variant="ghost" 
                      onClick={handleSignOut} 
                      className="w-full justify-start px-2 py-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Sign Out
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Link 
                    href="/explore" 
                    className="nav-link px-2 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Explore Styles
                  </Link>
                  <Link 
                    href="/feed" 
                    className="nav-link px-2 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Community
                  </Link>
                  <div className="border-t border-gray-200 pt-3 mt-3 space-y-2">
                    <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full">Sign In</Button>
                    </Link>
                    <Link href="/auth/register" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-primary-600 hover:bg-primary-700">Join WOREDROBE</Button>
                    </Link>
                  </div>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}