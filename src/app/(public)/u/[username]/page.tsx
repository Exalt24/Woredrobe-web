import { createServerSupabaseClientReadOnly } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, Users, Heart } from 'lucide-react'
import Image from 'next/image'

interface UserProfilePageProps {
  params: { username: string }
}

export default async function UserProfilePage({ params }: UserProfilePageProps) {
  
  // Mock data - replace with real database queries
  const user = {
    id: '1',
    username: params.username,
    full_name: 'Sarah Johnson',
    bio: 'Fashion enthusiast sharing my daily style journey ✨ Sustainable fashion advocate 🌱 Coffee lover ☕',
    avatar_url: '/placeholder-avatar.jpg',
    location: 'New York, NY',
    joined_date: '2024-01-15',
    followers_count: 1234,
    following_count: 567,
    stories_count: 89
  }

  const stories = [
    { id: '1', image_url: '/placeholder-outfit1.jpg', likes: 45, created_at: '2024-01-20' },
    { id: '2', image_url: '/placeholder-outfit2.jpg', likes: 32, created_at: '2024-01-19' },
    { id: '3', image_url: '/placeholder-outfit3.jpg', likes: 67, created_at: '2024-01-18' },
    { id: '4', image_url: '/placeholder-outfit4.jpg', likes: 23, created_at: '2024-01-17' },
    { id: '5', image_url: '/placeholder-outfit5.jpg', likes: 54, created_at: '2024-01-16' },
    { id: '6', image_url: '/placeholder-outfit6.jpg', likes: 78, created_at: '2024-01-15' },
  ]

  if (!user) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-4xl text-gray-500">👤</span>
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
              <h1 className="text-2xl font-bold">{user.full_name}</h1>
              <div className="flex gap-2">
                <Button>Follow</Button>
                <Button variant="outline">Message</Button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-6 mb-4">
              <div className="text-center">
                <div className="font-semibold text-lg">{user.stories_count}</div>
                <div className="text-gray-600 text-sm">Stories</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-lg">{user.followers_count.toLocaleString()}</div>
                <div className="text-gray-600 text-sm">Followers</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-lg">{user.following_count}</div>
                <div className="text-gray-600 text-sm">Following</div>
              </div>
            </div>

            {/* Bio */}
            <p className="text-gray-700 mb-3">{user.bio}</p>

            {/* Meta Info */}
            <div className="flex flex-col gap-1 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{user.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Joined {new Date(user.joined_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Style Stories</h2>
        
        {stories.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {stories.map((story) => (
              <div key={story.id} className="relative group cursor-pointer">
                <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                    <span className="text-gray-500">📸</span>
                  </div>
                </div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <div className="text-white flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    <span>{story.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👗</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No style stories yet</h3>
            <p className="text-gray-600">{user.full_name} hasn't shared any style stories yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}