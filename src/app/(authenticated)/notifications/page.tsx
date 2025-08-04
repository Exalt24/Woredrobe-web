import { Bell, Heart, MessageCircle, UserPlus, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotificationsPage() {
  const notifications = [
    {
      id: '1',
      type: 'like',
      user: { name: 'Emma Watson', username: 'emma_fashion' },
      content: 'liked your style story',
      time: '2 hours ago',
      read: false,
      story_id: '123'
    },
    {
      id: '2',
      type: 'comment',
      user: { name: 'Alex Chen', username: 'style_seeker' },
      content: 'commented: "Where did you get that blazer? 😍"',
      time: '4 hours ago',
      read: false,
      story_id: '124'
    },
    {
      id: '3',
      type: 'follow',
      user: { name: 'Maya Patel', username: 'vintage_vibes' },
      content: 'started following you',
      time: '1 day ago',
      read: true
    },
    {
      id: '4',
      type: 'trending',
      content: 'Your style story is trending in #thrift!',
      time: '2 days ago',
      read: true,
      story_id: '125'
    }
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case 'like': return <Heart className="w-5 h-5 text-red-500" />
      case 'comment': return <MessageCircle className="w-5 h-5 text-blue-500" />
      case 'follow': return <UserPlus className="w-5 h-5 text-green-500" />
      case 'trending': return <TrendingUp className="w-5 h-5 text-purple-500" />
      default: return <Bell className="w-5 h-5" />
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Notifications</h1>
            <Button variant="outline" size="sm">
              Mark all as read
            </Button>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 hover:bg-gray-50 transition-colors ${
                !notification.read ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex gap-3">
                <div className="flex-shrink-0 mt-1">
                  {getIcon(notification.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {notification.user && (
                      <span className="font-medium text-sm">
                        {notification.user.name}
                      </span>
                    )}
                    <span className="text-sm text-gray-600">
                      {notification.content}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {notification.time}
                  </div>
                </div>

                {!notification.read && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        {notifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications yet</h3>
            <p className="text-gray-600">When people interact with your style stories, you'll see it here.</p>
          </div>
        )}
      </div>
    </div>
  )
}