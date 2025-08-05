import { TrendingUp, Hash, Clock, Heart, UserPlus, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getServerUser } from '@/lib/auth/session'
import Link from 'next/link'

export default async function ExplorePage() {
  const user = await getServerUser()
  
  const trendingTags = [
    { tag: 'thrift', count: 1234, growth: '+15%' },
    { tag: 'vintage', count: 987, growth: '+8%' },
    { tag: 'sustainable', count: 756, growth: '+22%' },
    { tag: 'cozy', count: 543, growth: '+12%' },
    { tag: 'autumn', count: 432, growth: '+30%' },
  ]

  const featuredStories = [
    {
      id: '1',
      user: { name: 'Sarah J.', username: 'sarah-style' },
      image_url: '/placeholder1.jpg',
      likes: 234,
      description: 'Cozy autumn vibes with thrift finds',
      tags: ['thrift', 'autumn', 'cozy']
    },
    {
      id: '2',
      user: { name: 'Emma W.', username: 'emma_fashion' },
      image_url: '/placeholder2.jpg',
      likes: 189,
      description: 'Sustainable fashion meets street style',
      tags: ['sustainable', 'streetwear']
    },
    {
      id: '3',
      user: { name: 'Alex C.', username: 'alex_vintage' },
      image_url: '/placeholder3.jpg',
      likes: 156,
      description: 'Vintage pieces with modern twist',
      tags: ['vintage', 'modern']
    },
    {
      id: '4',
      user: { name: 'Maya P.', username: 'maya_style' },
      image_url: '/placeholder4.jpg',
      likes: 203,
      description: 'Workwear that actually works',
      tags: ['work', 'professional']
    },
  ]

  const recentActivity = [
    { user: 'Emma', action: 'shared a story', time: '2m ago' },
    { user: 'Alex', action: 'liked a post', time: '5m ago' },
    { user: 'Maya', action: 'joined WOREDROBE', time: '12m ago' },
    { user: 'Sofia', action: 'shared a story', time: '25m ago' },
    { user: 'James', action: 'liked a post', time: '1h ago' },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Explore Style Stories</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover authentic style inspiration from the WOREDROBE community. 
          Find trending looks, sustainable fashion ideas, and real outfit stories.
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Featured Stories */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <TrendingUp className="w-6 h-6" />
                Trending Now
              </h2>
              <Button variant="outline" size="sm">View All</Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {featuredStories.map((story) => (
                <Link key={story.id} href={`/story/${story.id}`}>
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden group cursor-pointer hover:shadow-md transition-shadow">
                    <div className="aspect-[3/4] bg-gray-200 relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                        <span className="text-4xl">👗</span>
                      </div>
                      <div className="absolute top-3 right-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">{story.likes}</span>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                        <span className="font-medium text-sm">{story.user.name}</span>
                      </div>
                      <p className="text-gray-700 text-sm mb-3">{story.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {story.tags.map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Browse by Category */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Browse by Style</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {['Casual', 'Work', 'Date Night', 'Weekend', 'Special Events', 'Seasonal'].map((category) => (
                <Link key={category} href={`/explore/${category.toLowerCase().replace(' ', '-')}`}>
                  <div className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow">
                    <div className="text-3xl mb-3">✨</div>
                    <h3 className="font-semibold">{category}</h3>
                    <p className="text-sm text-gray-600 mt-1">Explore {category.toLowerCase()} styles</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Join CTA for non-authenticated users */}
          {!user && (
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg p-6 border border-primary-200">
              <div className="text-center">
                <Sparkles className="w-8 h-8 text-primary-600 mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-2">Join WOREDROBE</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Share your style stories and connect with like-minded fashion enthusiasts
                </p>
                <div className="space-y-2">
                  <Link href="/auth/register">
                    <Button className="w-full">Sign Up Free</Button>
                  </Link>
                  <Link href="/auth/login">
                    <Button variant="outline" className="w-full">Sign In</Button>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Trending Tags */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Hash className="w-5 h-5" />
              Trending Tags
            </h3>
            <div className="space-y-3">
              {trendingTags.map((item) => (
                <Link key={item.tag} href={`/explore/tag/${item.tag}`}>
                  <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                    <div>
                      <div className="font-medium">#{item.tag}</div>
                      <div className="text-sm text-gray-600">{item.count.toLocaleString()} stories</div>
                    </div>
                    <div className="text-sm text-green-600 font-medium">{item.growth}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Activity
            </h3>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs">👤</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>
                      <span className="text-gray-600"> {activity.action}</span>
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold mb-4">Community Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Stories</span>
                <span className="font-medium">12,345</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Active Users</span>
                <span className="font-medium">2,891</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">This Week</span>
                <span className="font-medium text-green-600">+456 stories</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}