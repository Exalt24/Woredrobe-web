export default function FeedPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="heading-lg mb-4">Style Stories Feed</h1>
        <p className="text-gray-600 mb-8">
          Coming soon! This will be your Pinterest-style feed of authentic outfit stories.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="card">
              <div className="loading-skeleton h-64 mb-4"></div>
              <div className="loading-skeleton h-4 mb-2"></div>
              <div className="loading-skeleton h-4 w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}