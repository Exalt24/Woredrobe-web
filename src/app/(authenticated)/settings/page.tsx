'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'
import { useMinimalAuth } from '@/components/providers/auth-provider'
import { Shield, Bell, Eye, Download, Trash2, LogOut } from 'lucide-react'

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [profileVisibility, setProfileVisibility] = useState('public')
  const [dataProcessing, setDataProcessing] = useState(false)
  const { toast } = useToast()
  const { signOut } = useMinimalAuth()

  const handleSaveSettings = () => {
    toast.success('Your settings have been saved successfully!')
  }

  const handleExportData = () => {
    toast.info('We\'ll email you a download link within 24 hours.')
  }

  const handleDeleteAccount = () => {
    toast.error('Account deletion requires email confirmation. Check your inbox.')
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        <div className="space-y-8">
          {/* Notifications */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Notifications</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">Email Notifications</label>
                  <p className="text-sm text-gray-600">Receive updates about likes, comments, and followers</p>
                </div>
                <input
                  title="Email Notifications"
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  className="rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">Push Notifications</label>
                  <p className="text-sm text-gray-600">Get notified about activity on your style stories</p>
                </div>
                <input
                  title='Push Notifications'
                  type="checkbox"
                  checked={pushNotifications}
                  onChange={(e) => setPushNotifications(e.target.checked)}
                  className="rounded"
                />
              </div>
            </div>
          </section>

          {/* Privacy */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Eye className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Privacy</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="font-medium block mb-2">Profile Visibility</label>
                <select
                    title="Profile Visibility"
                  value={profileVisibility}
                  onChange={(e) => setProfileVisibility(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="public">Public - Anyone can see your profile</option>
                  <option value="private">Private - Only approved followers</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">Data Processing</label>
                  <p className="text-sm text-gray-600">Allow us to improve recommendations using your data</p>
                </div>
                <input
                  title="Data Processing"
                  type="checkbox"
                  checked={dataProcessing}
                  onChange={(e) => setDataProcessing(e.target.checked)}
                  className="rounded"
                />
              </div>
            </div>
          </section>

          {/* Account */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Account</h2>
            </div>
            <div className="space-y-3">
              <Button
                onClick={handleExportData}
                variant="outline"
                className="w-full justify-start"
              >
                <Download className="w-4 h-4 mr-2" />
                Export My Data
              </Button>
              <Button
                onClick={handleDeleteAccount}
                variant="outline"
                className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
              <Button
                onClick={signOut}
                variant="outline"
                className="w-full justify-start"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </section>

          {/* Save Button */}
          <Button onClick={handleSaveSettings} className="w-full">
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  )
}