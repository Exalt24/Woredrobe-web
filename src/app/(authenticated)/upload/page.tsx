// app/(authenticated)/upload/page.tsx
'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'
import { Upload, Camera, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function UploadPage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [description, setDescription] = useState('')
  const [mood, setMood] = useState('')
  const [occasion, setOccasion] = useState('')
  const [season, setSeason] = useState('')
  const [tags, setTags] = useState('')
  const [confidenceLevel, setConfidenceLevel] = useState(5)
  const [isOutfitRepeat, setIsOutfitRepeat] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const { toast } = useToast()
  const router = useRouter()

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedImage) {
      toast.error('Please select an image for your style story')
      return
    }

    setLoading(true)
    
    try {
      // TODO: Implement actual upload logic with Supabase
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate upload
      
      toast.success('Your style story has been shared!', 'Success')
      router.push('/feed')
    } catch (error) {
      toast.error('Failed to share your style story. Please try again.', 'Upload Failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6">Share Your Style Story</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Outfit Photo *
            </label>
            
            {!imagePreview ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Click to upload your outfit photo</p>
                  <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                </label>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full max-w-md mx-auto rounded-lg"
                />
                <button
                  title='Remove Image'
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Tell your style story
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Share the story behind this outfit... Where did you get these pieces? What inspired this look?"
              className="w-full p-3 border border-gray-300 rounded-lg resize-none"
              rows={4}
            />
          </div>

          {/* Mood & Occasion */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="mood" className="block text-sm font-medium text-gray-700 mb-2">
                Mood
              </label>
              <select
                id="mood"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="">Select mood...</option>
                <option value="confident">Confident</option>
                <option value="playful">Playful</option>
                <option value="cozy">Cozy</option>
                <option value="bold">Bold</option>
                <option value="elegant">Elegant</option>
                <option value="casual">Casual</option>
                <option value="edgy">Edgy</option>
                <option value="romantic">Romantic</option>
              </select>
            </div>

            <div>
              <label htmlFor="occasion" className="block text-sm font-medium text-gray-700 mb-2">
                Occasion
              </label>
              <select
                id="occasion"
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="">Select occasion...</option>
                <option value="everyday">Everyday</option>
                <option value="work">Work</option>
                <option value="date-night">Date Night</option>
                <option value="party">Party</option>
                <option value="vacation">Vacation</option>
                <option value="special-event">Special Event</option>
                <option value="weekend">Weekend</option>
                <option value="exercise">Exercise</option>
              </select>
            </div>
          </div>

          {/* Season & Tags */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="season" className="block text-sm font-medium text-gray-700 mb-2">
                Season
              </label>
              <select
                id="season"
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="">Select season...</option>
                <option value="spring">Spring</option>
                <option value="summer">Summer</option>
                <option value="autumn">Autumn</option>
                <option value="winter">Winter</option>
              </select>
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <input
                id="tags"
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="thrift, vintage, sustainable..."
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
            </div>
          </div>

          {/* Confidence Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confidence Level: {confidenceLevel}/10
            </label>
            <input
              title="Confidence Level"
              placeholder='Rate your confidence in this outfit'
              type="range"
              min="1"
              max="10"
              value={confidenceLevel}
              onChange={(e) => setConfidenceLevel(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Less confident</span>
              <span>Very confident</span>
            </div>
          </div>

          {/* Outfit Repeat */}
          <div className="flex items-center gap-3">
            <input
              id="outfit-repeat"
              type="checkbox"
              checked={isOutfitRepeat}
              onChange={(e) => setIsOutfitRepeat(e.target.checked)}
              className="rounded"
            />
            <label htmlFor="outfit-repeat" className="text-sm text-gray-700">
              This is an outfit repeat (and I&apos;m proud of it!) 💚
            </label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            loading={loading}
            className="w-full"
            disabled={!selectedImage}
          >
            Share Your Style Story
          </Button>
        </form>
      </div>
    </div>
  )
}