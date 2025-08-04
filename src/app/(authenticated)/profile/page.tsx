import { createServerSupabaseClientReadOnly } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Edit, Plus, BarChart, Heart, Eye, Calendar } from 'lucide-react'
import Link from 'next/link'
import { requireAuth } from '@/lib/auth/session'

export default async function MyProfilePage() {
  const user = await requireAuth()

  // Mock data - replace with real database queries
  const profile = {
    username: 'sarah-style',
    full_name: user.user_metadata?.full_name || 'Sarah Johnson',
    bio: 'Fashion enthusiast sharing my daily style journey ✨ Sustainable fashion advocate 🌱',
    location: 'New York, NY',
    website: 'sarahjohnson.style',
    joined_date: '2024-01-15',
    followers_count: 1234,
    following_count: 567,
    stories_count: 89,
    total_likes: 3456,
    profile_views: 8901
  }

  const recentStories = [
    { id: '1', image_url: '/placeholder-outfit1.jpg', likes: 45, views: 234, created_at: '2024-01-20' },
    { id: '2', image_url: '/placeholder-outfit2.jpg', likes: 32, views: 189, created_at: '2024-01-19' },
    { id: '3', image_url: '/placeholder-outfit3.jpg', likes: 67, views: 345, created_at: '2024-01-18' },
    { id: '4', image_url: '/placeholder-outfit4.jpg', likes: 23, views: 156, created_at: '2024-01-17' },
  ]

  const stats = [
    { label: 'Total Stories', value: profile.stories_count, icon: <BarChart className="w-5 h-5" /> },
    { label: 'Total Likes', value: profile.total_likes.toLocaleString(), icon: <Heart className="w-5 h-5" /> },
    { label: 'Profile Views', value: profile.profile_views.toLocaleString(), icon: <Eye className="w-5 h-5" /> },
  ]

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
              <div>
                <h1 className="text-2xl font-bold">{profile.full_name}</h1>
                <p className="text-gray-600">@{profile.username}</p>
              </div>
              <div className="flex gap-2">
                <Link href="/profile/edit">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </Button>
                </Link>
                <Link href={`/u/${profile.username}`}>
                  <Button variant="outline">View Public Profile</Button>
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-6 mb-4">
              <div className="text-center">
                <div className="font-semibold text-lg">{profile.stories_count}</div>
                <div className="text-gray-600 text-sm">Stories</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-lg">{profile.followers_count.toLocaleString()}</div>
                <div className="text-gray-600 text-sm">Followers</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-lg">{profile.following_count}</div>
                <div className="text-gray-600 text-sm">Following</div>
              </div>
            </div>

            {/* Bio */}
            {profile.bio && <p className="text-gray-700 mb-3">{profile.bio}</p>}

            {/* Website */}
            {profile.website && (
              <a href={`https://${profile.website}`} target="_blank" rel="noopener noreferrer" 
                 className="text-primary-600 hover:underline">
                {profile.website}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="text-primary-600">{stat.icon}</div>
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/upload">
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Share New Story
            </Button>
          </Link>
          <Link href="/profile/edit">
            <Button variant="outline" className="flex items-center gap-2">
              <Edit className="w-4 h-4" />
              Edit Profile
            </Button>
          </Link>
          <Link href="/settings">
            <Button variant="outline">Settings</Button>
          </Link>
        </div>
      </div>

      {/* Recent Stories */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Stories</h2>
          <Link href="/upload" className="text-primary-600 hover:underline text-sm">
            Share new story
          </Link>
        </div>
        
        {recentStories.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recentStories.map((story) => (
              <div key={story.id} className="group cursor-pointer">
                <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden mb-2">
                  <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                    <span className="text-gray-500">📸</span>
                  </div>
                </div>
                <div className="text-sm space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-gray-600">
                      <Heart className="w-3 h-3" />
                      {story.likes}
                    </span>
                    <span className="flex items-center gap-1 text-gray-600">
                      <Eye className="w-3 h-3" />
                      {story.views}
                    </span>
                  </div>
                  <div className="text-gray-500 text-xs">
                    {new Date(story.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📷</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No stories yet</h3>
            <p className="text-gray-600 mb-4">Share your first style story to get started!</p>
            <Link href="/upload">
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Share Your First Story
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}