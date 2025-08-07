"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Settings, Info, LogOut, Github, Heart } from "lucide-react"

interface FooterProps {
  settings: {
    notifications: boolean
    autoSave: boolean
    soundEffects: boolean
    dailyReminders: boolean
  }
  onSettingsChange: (settings: any) => void
  onLogout: () => void
}

export default function Footer({ settings, onSettingsChange, onLogout }: FooterProps) {
  const [showSettings, setShowSettings] = useState(false)
  const [showAbout, setShowAbout] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [passwordChanged, setPasswordChanged] = useState(false)

  const handlePasswordChange = () => {
    if (newPassword.length >= 4) {
      localStorage.setItem("blackbox_password", newPassword)
      setPasswordChanged(true)
      setNewPassword("")
      setTimeout(() => setPasswordChanged(false), 3000)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("blackbox_authenticated")
    onLogout()
  }

  return (
    <footer className="mt-12 border-t border-white/10 bg-black/20 backdrop-blur-md">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <p className="text-gray-400 text-sm">
              Built with <Heart className="w-4 h-4 inline text-red-400" /> for personal growth
            </p>
            {/* Replace this href with your actual GitHub username */}
            <a
              href="https://github.com/LocaMartin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              title="View on GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>

          <div className="flex items-center space-x-4">
            {/* Settings Dialog */}
            <Dialog open={showSettings} onOpenChange={setShowSettings}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 border border-transparent hover:border-white/20"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-black/90 backdrop-blur-md border border-white/20 text-white max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-white flex items-center gap-2">
                    <Settings className="w-5 h-5 text-cyan-400" />
                    Settings
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                    <Label htmlFor="notifications" className="text-white">
                      Enable Notifications
                    </Label>
                    <Switch
                      id="notifications"
                      checked={settings.notifications}
                      onCheckedChange={(checked) => onSettingsChange({ ...settings, notifications: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                    <Label htmlFor="autoSave" className="text-white">
                      Auto Save
                    </Label>
                    <Switch
                      id="autoSave"
                      checked={settings.autoSave}
                      onCheckedChange={(checked) => onSettingsChange({ ...settings, autoSave: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                    <Label htmlFor="soundEffects" className="text-white">
                      Sound Effects
                    </Label>
                    <Switch
                      id="soundEffects"
                      checked={settings.soundEffects}
                      onCheckedChange={(checked) => onSettingsChange({ ...settings, soundEffects: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                    <Label htmlFor="dailyReminders" className="text-white">
                      Daily Reminders
                    </Label>
                    <Switch
                      id="dailyReminders"
                      checked={settings.dailyReminders}
                      onCheckedChange={(checked) => onSettingsChange({ ...settings, dailyReminders: checked })}
                    />
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <Label className="text-white mb-2 block">Change Password</Label>
                    <div className="flex gap-2">
                      <Input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New password (min 4 chars)"
                        className="bg-white/5 border-white/10 text-white placeholder-gray-400"
                      />
                      <Button
                        onClick={handlePasswordChange}
                        disabled={newPassword.length < 4}
                        className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/30"
                      >
                        Update
                      </Button>
                    </div>
                    {passwordChanged && <p className="text-green-400 text-sm mt-2">Password updated successfully!</p>}
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* About Dialog */}
            <Dialog open={showAbout} onOpenChange={setShowAbout}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 border border-transparent hover:border-white/20"
                >
                  <Info className="w-4 h-4 mr-2" />
                  About
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-black/90 backdrop-blur-md border border-white/20 text-white max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-white text-2xl flex items-center gap-2">
                    <Info className="w-6 h-6 text-cyan-400" />
                    About Black Box
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <p className="text-gray-300 leading-relaxed">
                    The <strong className="text-cyan-400">Black Box Effect</strong> in personal development refers to
                    the mysterious process of internal growth and transformation. Just like a black box in systems
                    theory, we can observe the inputs (efforts, experiences, learning) and outputs (results, behaviors,
                    achievements), but the internal transformation process often remains hidden.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    This application helps you <strong className="text-purple-400">illuminate the black box</strong> of
                    your personal development by:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                    <li>Tracking your daily inputs and efforts</li>
                    <li>Monitoring progress and outcomes</li>
                    <li>Reflecting on mistakes and learning opportunities</li>
                    <li>Managing habits and addictions systematically</li>
                    <li>Planning structured growth paths</li>
                    <li>Creating awareness of your transformation process</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed">
                    By making the invisible visible, you gain control over your personal development journey and can
                    optimize your growth process with <strong className="text-green-400">data-driven insights</strong>.
                  </p>
                  <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 p-4 rounded-lg border border-cyan-500/20">
                    <p className="text-cyan-400 font-semibold">Privacy & Security:</p>
                    <ul className="text-gray-300 text-sm mt-1 space-y-1">
                      <li>• All data is stored locally in your browser</li>
                      <li>• No information is sent to external servers</li>
                      <li>• Password protection secures your personal data</li>
                      <li>• You have complete control over your information</li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-4 rounded-lg border border-purple-500/20">
                    <p className="text-purple-400 font-semibold">Remember:</p>
                    <p className="text-gray-300 text-sm mt-1">
                      "The black box of personal development becomes transparent through consistent observation,
                      reflection, and systematic tracking of your growth journey."
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              onClick={handleLogout}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 border border-transparent hover:border-red-500/30"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 text-center">
          <p className="text-gray-500 text-xs">Black Box v1.0.0 • All data stored locally • No external tracking</p>
        </div>
      </div>
    </footer>
  )
}
