import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-secondary-50 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="heading-xl gradient-text mb-6">
              Your style story, one outfit at a time
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Document and celebrate the outfits you actually wear. 
              Join the anti-fast fashion community that values authenticity over perfection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Your Style Story
                </Button>
              </Link>
              <Link href="/feed">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Explore Stories
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Celebrate Real Style</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              WOREDROBE is the anti-fast fashion platform where authenticity wins over perfection
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📸</span>
              </div>
              <h3 className="heading-sm mb-3">Document Your Outfits</h3>
              <p className="text-gray-600">
                Capture and celebrate the clothes you actually wear, creating a personal style archive
              </p>
            </div>
            
            <div className="card text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💚</span>
              </div>
              <h3 className="heading-sm mb-3">Embrace Outfit Repeating</h3>
              <p className="text-gray-600">
                Combat outfit-repeating shame and celebrate sustainable fashion choices
              </p>
            </div>
            
            <div className="card text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="heading-sm mb-3">Build Confidence</h3>
              <p className="text-gray-600">
                Share your authentic style journey and get inspired by real people&apos;s fashion choices
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="heading-lg text-white mb-4">
            Ready to start your style story?
          </h2>
          <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of style storytellers celebrating authentic fashion
          </p>
          <Link href="/auth/register">
            <Button variant="outline" size="lg" className="bg-white text-primary-600 hover:bg-gray-50">
              Join WOREDROBE
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}