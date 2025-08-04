// app/(public)/story/[id]/page.tsx
import { createServerSupabaseClientReadOnly } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Heart, MessageCircle, Share2, Calendar, Tag } from 'lucide-react'
import Link from 'next/link'

interface StoryDetailPageProps {
  params: { id: string }
}

export default async function StoryDetailPage({ params }: StoryDetailPageProps) {
  const supabase = await createServerSupabaseClientReadOnly()
  
  // Mock data - replace with real database queries
  const story = {
    id: params.id,
    image_url: '/placeholder-outfit.jpg',
    description: 'Loving this cozy autumn look! 🍂 Mixed vintage thrift finds with some new pieces. The oversized blazer is from a local thrift shop and the boots are my go-to for comfort and style. What do you think of this color combo?',
    mood: 'cozy',
    occasion: 'casual',
    season: 'autumn',
    tags: ['thrift', 'vintage', 'cozy', 'autumn'],
    is_outfit_repeat: false,
    confidence_level: 8,
    likes_count: 127,
    comments_count: 23,
    created_at: '2024-01-20T10:30:00Z',
    user: {
      id: '1',
      username: 'sarah-style',
      full_name: 'Sarah Johnson',
      avatar_url: '/placeholder-avatar.jpg'
    }
  }

  const comments = [
    {
      id: '1',
      content: 'This outfit is absolutely stunning! Love the color coordination 💕',
      user: { username: 'emma_fashion', full_name: 'Emma Watson' },
      created_at: '2024-01-20T11:00:00Z'
    },
    {
      id: '2',
      content: 'Where did you get that blazer? I need it in my life! 😍',
      user: { username: 'style_seeker', full_name: 'Alex Chen' },
      created_at: '2024-01-20T11:15:00Z'
    },
    {
      id: '3',
      content: 'Thrift finds always hit different! You styled this perfectly ✨',
      user: { username: 'vintage_vibes', full_name: 'Maya Patel' },
      created_at: '2024-01-20T11:30:00Z'
    }
  ]

  if (!story) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Story Image */}
        <div className="space-y-4">
          <div className="aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
              <span className="text-6xl">👗</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              <span>{story.likes_count}</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <span>{story.comments_count}</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              <span>Share</span>
            </Button>
          </div>
        </div>

        {/* Story Details */}
        <div className="space-y-6">
          {/* Author */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-xl">👤</span>
            </div>
            <div>
              <Link href={`/u/${story.user.username}`} className="font-semibold hover:underline">
                {story.user.full_name}
              </Link>
              <div className="text-sm text-gray-600">@{story.user.username}</div>
            </div>
          </div>

          {/* Story Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>{new Date(story.created_at).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>

            {/* Mood & Occasion */}
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {story.mood}
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                {story.occasion}
              </span>
              <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                {story.season}
              </span>
              {story.is_outfit_repeat && (
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                  outfit repeat
                </span>
              )}
            </div>

            {/* Description */}
            <div>
              <h2 className="font-semibold mb-2">Style Story</h2>
              <p className="text-gray-700">{story.description}</p>
            </div>

            {/* Tags */}
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {story.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Confidence Level */}
            <div>
              <h3 className="font-semibold mb-2">Confidence Level</h3>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(10)].map((_, i) => (
                    <span key={i} className={`text-lg ${i < story.confidence_level ? 'text-yellow-400' : 'text-gray-300'}`}>
                      ⭐
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-600">{story.confidence_level}/10</span>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div>
            <h3 className="font-semibold mb-4">Comments ({story.comments_count})</h3>
            
            {/* Comment Input */}
            <div className="mb-4">
              <textarea
                placeholder="Share your thoughts on this style..."
                className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                rows={3}
              />
              <Button className="mt-2">Post Comment</Button>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">👤</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{comment.user.full_name}</span>
                      <span className="text-gray-500 text-xs">
                        {new Date(comment.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}