'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'
import { Camera, X, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function EditProfilePage() {
  const [avatar, setAvatar] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [fullName, setFullName] = useState('Sarah Johnson')
  const [username, setUsername] = useState('sarah-style')
  const [bio, setBio] = useState('Fashion enthusiast sharing my daily style journey ✨ Sustainable fashion advocate 🌱')
  const [location, setLocation] = useState('New York, NY')
  const [website, setWebsite] = useState('sarahjohnson.style')
  const [isPrivate, setIsPrivate] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const { toast } = useToast()
  const router = useRouter()

  const handleAvatarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatar(file)
      const reader = new FileReader()
      reader.onload = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeAvatar = () => {
    setAvatar(null)
    setAvatarPreview(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // TODO: Implement actual update logic with Supabase
      await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate update
      
      toast.success('Your profile has been updated successfully!', 'Profile Updated')
      router.push('/profile')
    } catch (error) {
      toast.error('Failed to update your profile. Please try again.', 'Update Failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/profile">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Edit Profile</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              {avatarPreview ? (
                <div className="relative">
                  <img
                    src={avatarPreview}
                    alt="Avatar preview"
                    className="w-32 h-32 rounded-full object-cover"
                  />
                  <button
                    title="Remove Avatar"
                    type="button"
                    onClick={removeAvatar}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-4xl text-gray-500">👤</span>
                </div>
              )}
              
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-primary-600 text-white rounded-full p-2 cursor-pointer hover:bg-primary-700"
              >
                <Camera className="w-4 h-4" />
              </label>
              <input
                title='Upload Avatar'
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarSelect}
                className="hidden"
              />
            </div>
            <p className="text-sm text-gray-600">Click the camera to update your profile photo</p>
          </div>

          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username *
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                @
              </span>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                className="flex-1 p-3 border border-gray-300 rounded-r-lg"
                required
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Your profile will be available at woredrobe.com/u/{username}
            </p>
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell people about your style..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none"
              rows={4}
              maxLength={160}
            />
            <p className="text-xs text-gray-500 mt-1">
              {bio.length}/160 characters
            </p>
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, Country"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Website */}
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
              Website
            </label>
            <input
              id="website"
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="your-website.com"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Privacy Settings */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium mb-4">Privacy Settings</h3>
            
            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="private-account" className="font-medium text-gray-900">
                  Private Account
                </label>
                <p className="text-sm text-gray-600">
                  When your account is private, only people you approve can see your style stories
                </p>
              </div>
              <input
                id="private-account"
                type="checkbox"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
                className="rounded"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6">
            <Button
              type="submit"
              loading={loading}
              className="flex-1"
            >
              Save Changes
            </Button>
            <Link href="/profile">
              <Button variant="outline" className="px-6">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}