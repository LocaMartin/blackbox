"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, Eye, EyeOff } from "lucide-react"

interface LoginProps {
  onLogin: () => void
}

export default function Login({ onLogin }: LoginProps) {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Default password - users can change this in settings
  const [storedPassword, setStoredPassword] = useState("blackbox2024")

  useEffect(() => {
    // Load custom password from localStorage if it exists
    const customPassword = localStorage.getItem("blackbox_password")
    if (customPassword) {
      setStoredPassword(customPassword)
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate loading for better UX
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (password === storedPassword) {
      localStorage.setItem("blackbox_authenticated", "true")
      onLogin()
    } else {
      setError("Incorrect password. Please try again.")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden flex items-center justify-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md p-6">
        <div className="text-center space-y-4 mb-8">
          <div className="relative inline-block">
            <div className="w-20 h-20 mx-auto relative">
              {/* Glowing effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-lg blur-lg opacity-75 animate-pulse"></div>
              {/* Black box container */}
              <div className="relative w-full h-full bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg shadow-2xl">
                {/* Opened box effect */}
                <div className="absolute inset-2 border-2 border-dashed border-cyan-400/50 rounded animate-pulse"></div>
                {/* Inner glow */}
                <div className="absolute inset-4 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 rounded blur-sm"></div>
                {/* Center symbol */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 200 200" className="animate-pulse">
                    <polygon points="100,30 160,60 100,90 40,60" fill="currentColor" className="text-cyan-400" />
                    <polygon
                      points="100,90 160,60 160,140 100,170"
                      fill="currentColor"
                      className="text-cyan-400 opacity-80"
                    />
                    <polygon
                      points="40,60 100,90 100,170 40,140"
                      fill="currentColor"
                      className="text-cyan-400 opacity-60"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Black Box
          </h1>
          <p className="text-gray-300">Enter your password to access your personal development dashboard</p>
        </div>

        <Card className="bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-white flex items-center justify-center gap-2">
              <Lock className="w-5 h-5 text-cyan-400" />
              Secure Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder-gray-400 pr-10"
                    placeholder="Enter your password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              {error && (
                <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded p-2">{error}</div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold"
                disabled={isLoading}
              >
                {isLoading ? "Authenticating..." : "Access Black Box"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <div className="text-xs text-gray-400 bg-white/5 p-3 rounded border border-white/10">
                <p className="font-semibold text-cyan-400 mb-1">Default Password:</p>
                <p className="font-mono">blackbox2024</p>
                <p className="mt-2 text-gray-500">You can change this in settings after logging in</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-xs text-gray-400">
          <p>🔒 All data is stored locally in your browser</p>
          <p>No information is sent to external servers</p>
        </div>
      </div>
    </div>
  )
}
