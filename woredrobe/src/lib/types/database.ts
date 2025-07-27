export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          bio: string | null
          avatar_url: string | null
          website: string | null
          followers_count: number
          following_count: number
          stories_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          website?: string | null
          followers_count?: number
          following_count?: number
          stories_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          website?: string | null
          followers_count?: number
          following_count?: number
          stories_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      style_stories: {
        Row: {
          id: string
          user_id: string
          image_url: string
          image_alt: string | null
          story_text: string | null
          mood: string | null
          occasion: string | null
          season: string | null
          confidence_level: number | null
          is_outfit_repeat: boolean
          tags: string[]
          likes_count: number
          comments_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          image_url: string
          image_alt?: string | null
          story_text?: string | null
          mood?: string | null
          occasion?: string | null
          season?: string | null
          confidence_level?: number | null
          is_outfit_repeat?: boolean
          tags?: string[]
          likes_count?: number
          comments_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          image_url?: string
          image_alt?: string | null
          story_text?: string | null
          mood?: string | null
          occasion?: string | null
          season?: string | null
          confidence_level?: number | null
          is_outfit_repeat?: boolean
          tags?: string[]
          likes_count?: number
          comments_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      // Add other table types...
    }
  }
}