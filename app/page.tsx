"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Plus,
  Target,
  TrendingUp,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Brain,
  Lightbulb,
  BookOpen,
  Zap,
  Clock,
  Play,
  Pause,
  Square,
  CheckSquare,
  ListTodo,
  Save,
  Download,
} from "lucide-react"

import Login from "@/components/login"
import Footer from "@/components/footer"

export default function BlackBoxPersonalDev() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Learn React Advanced Patterns",
      progress: 70,
      category: "Learning",
      dateAssigned: "2024-01-15",
      targetDate: "2024-03-15",
    },
    {
      id: 2,
      title: "Daily Meditation Practice",
      progress: 85,
      category: "Wellness",
      dateAssigned: "2024-01-10",
      targetDate: "2024-02-10",
    },
    {
      id: 3,
      title: "Complete Side Project",
      progress: 45,
      category: "Career",
      dateAssigned: "2024-01-20",
      targetDate: "2024-04-20",
    },
  ])
  const [positives, setPositives] = useState([
    "Successfully completed morning routine for 7 days straight",
    "Had a breakthrough in understanding complex algorithms",
    "Improved communication with team members",
  ])
  const [mistakes, setMistakes] = useState([
    "Procrastinated on important tasks",
    "Skipped workout sessions twice this week",
    "Didn't follow up on networking opportunities",
  ])
  const [addictions, setAddictions] = useState([
    {
      name: "Social Media Scrolling",
      severity: "Medium",
      strategy: "Use app timers and designated phone-free hours",
      progress: 60,
    },
    {
      name: "Perfectionism",
      severity: "High",
      strategy: "Set 'good enough' standards and time limits for tasks",
      progress: 40,
    },
  ])
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete React Learning Path",
      completed: false,
      subtasks: [
        { id: 11, title: "Learn React Hooks", completed: true },
        { id: 12, title: "Master State Management", completed: true },
        { id: 13, title: "Build Practice Projects", completed: false },
        { id: 14, title: "Learn Testing", completed: false },
      ],
    },
    {
      id: 2,
      title: "Improve Physical Health",
      completed: false,
      subtasks: [
        { id: 21, title: "Morning workout routine", completed: true },
        { id: 22, title: "Meal prep for the week", completed: false },
        { id: 23, title: "Track water intake", completed: true },
      ],
    },
  ])
  const [stopwatchTime, setStopwatchTime] = useState(0)
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false)
  const [stopwatchInterval, setStopwatchInterval] = useState(null)
  const [settings, setSettings] = useState({
    darkMode: true,
    notifications: true,
    autoSave: true,
    soundEffects: false,
    dailyReminders: true,
  })
  const [overallProgress, setOverallProgress] = useState(65)
  const [dailyProgress, setDailyProgress] = useState(80)

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [dateEntries, setDateEntries] = useState({})
  const [currentDateEntry, setCurrentDateEntry] = useState({
    mood: 5,
    productivity: 5,
    notes: "",
    achievements: [],
    challenges: [],
  })

  const [completedDates, setCompletedDates] = useState(new Set())
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  // New states for form inputs
  const [newGoalTitle, setNewGoalTitle] = useState("")
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [newPositive, setNewPositive] = useState("")
  const [newMistake, setNewMistake] = useState("")
  const [newAddictionName, setNewAddictionName] = useState("")
  const [editorContent, setEditorContent] = useState("")
  const [shortTermPlan, setShortTermPlan] = useState("")
  const [longTermPlan, setLongTermPlan] = useState("")
  const [dailyHabits, setDailyHabits] = useState("")

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const toggleDateCompletion = (dateKey) => {
    setCompletedDates((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(dateKey)) {
        newSet.delete(dateKey)
      } else {
        newSet.add(dateKey)
      }
      return newSet
    })
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getDaysUntilTarget = (targetDate) => {
    const today = new Date()
    const target = new Date(targetDate)
    const diffTime = target - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  // Button handler functions
  const handleAddGoal = () => {
    if (newGoalTitle.trim()) {
      const newGoal = {
        id: Date.now(),
        title: newGoalTitle,
        progress: 0,
        category: "General",
        dateAssigned: new Date().toISOString().split("T")[0],
        targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 30 days from now
      }
      setGoals([...goals, newGoal])
      setNewGoalTitle("")
      alert("Goal added successfully!")
    }
  }

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      const newTask = {
        id: Date.now(),
        title: newTaskTitle,
        completed: false,
        subtasks: [],
      }
      setTasks([...tasks, newTask])
      setNewTaskTitle("")
      alert("Task added successfully!")
    }
  }

  const handleAddPositive = () => {
    if (newPositive.trim()) {
      setPositives([...positives, newPositive])
      setNewPositive("")
      alert("Positive achievement added!")
    }
  }

  const handleAddMistake = () => {
    if (newMistake.trim()) {
      setMistakes([...mistakes, newMistake])
      setNewMistake("")
      alert("Mistake added for learning!")
    }
  }

  const handleAddAddiction = () => {
    if (newAddictionName.trim()) {
      const newAddiction = {
        name: newAddictionName,
        severity: "Medium",
        strategy: "Define your strategy here...",
        progress: 0,
      }
      setAddictions([...addictions, newAddiction])
      setNewAddictionName("")
      alert("Habit tracking added!")
    }
  }

  const handleSaveEditor = () => {
    localStorage.setItem("blackbox_editor_content", editorContent)
    alert("Content saved successfully!")
  }

  const handleExportEditor = () => {
    const blob = new Blob([editorContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "blackbox-reflection.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleSaveDailyEntry = () => {
    const entryData = {
      ...currentDateEntry,
      date: selectedDate,
      timestamp: new Date().toISOString(),
    }
    setDateEntries({ ...dateEntries, [selectedDate]: entryData })
    alert("Daily entry saved!")
  }

  const handleSaveSession = () => {
    const sessionData = {
      duration: formatStopwatchTime(stopwatchTime),
      timestamp: new Date().toISOString(),
      type: "Focus Session",
    }
    const sessions = JSON.parse(localStorage.getItem("blackbox_sessions") || "[]")
    sessions.push(sessionData)
    localStorage.setItem("blackbox_sessions", JSON.stringify(sessions))
    alert("Session saved!")
  }

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem("blackbox_authenticated")
    if (authStatus === "true") {
      setIsAuthenticated(true)
    }

    // Load data from localStorage only if authenticated
    if (authStatus === "true") {
      const savedGoals = localStorage.getItem("blackbox_goals")
      if (savedGoals) setGoals(JSON.parse(savedGoals))

      const savedTasks = localStorage.getItem("blackbox_tasks")
      if (savedTasks) setTasks(JSON.parse(savedTasks))

      const savedPositives = localStorage.getItem("blackbox_positives")
      if (savedPositives) setPositives(JSON.parse(savedPositives))

      const savedMistakes = localStorage.getItem("blackbox_mistakes")
      if (savedMistakes) setMistakes(JSON.parse(savedMistakes))

      const savedAddictions = localStorage.getItem("blackbox_addictions")
      if (savedAddictions) setAddictions(JSON.parse(savedAddictions))

      const savedSettings = localStorage.getItem("blackbox_settings")
      if (savedSettings) setSettings(JSON.parse(savedSettings))

      const savedDateEntries = localStorage.getItem("blackbox_date_entries")
      if (savedDateEntries) setDateEntries(JSON.parse(savedDateEntries))

      const savedCompletedDates = localStorage.getItem("blackbox_completed_dates")
      if (savedCompletedDates) {
        setCompletedDates(new Set(JSON.parse(savedCompletedDates)))
      }

      const savedEditorContent = localStorage.getItem("blackbox_editor_content")
      if (savedEditorContent) setEditorContent(savedEditorContent)

      const savedPlans = localStorage.getItem("blackbox_plans")
      if (savedPlans) {
        const plans = JSON.parse(savedPlans)
        setShortTermPlan(plans.shortTerm || "")
        setLongTermPlan(plans.longTerm || "")
        setDailyHabits(plans.dailyHabits || "")
      }
    }
  }, [])

  // Auto-save data to localStorage whenever state changes
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("blackbox_goals", JSON.stringify(goals))
    }
  }, [goals, isAuthenticated])

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("blackbox_tasks", JSON.stringify(tasks))
    }
  }, [tasks, isAuthenticated])

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("blackbox_positives", JSON.stringify(positives))
    }
  }, [positives, isAuthenticated])

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("blackbox_mistakes", JSON.stringify(mistakes))
    }
  }, [mistakes, isAuthenticated])

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("blackbox_addictions", JSON.stringify(addictions))
    }
  }, [addictions, isAuthenticated])

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("blackbox_settings", JSON.stringify(settings))
    }
  }, [settings, isAuthenticated])

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("blackbox_date_entries", JSON.stringify(dateEntries))
    }
  }, [dateEntries, isAuthenticated])

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("blackbox_completed_dates", JSON.stringify(Array.from(completedDates)))
    }
  }, [completedDates, isAuthenticated])

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem(
        "blackbox_plans",
        JSON.stringify({
          shortTerm: shortTermPlan,
          longTerm: longTermPlan,
          dailyHabits: dailyHabits,
        }),
      )
    }
  }, [shortTermPlan, longTermPlan, dailyHabits, isAuthenticated])

  const startStopwatch = () => {
    if (!isStopwatchRunning) {
      setIsStopwatchRunning(true)
      const interval = setInterval(() => {
        setStopwatchTime((prev) => prev + 1)
      }, 10)
      setStopwatchInterval(interval)
    }
  }

  const pauseStopwatch = () => {
    if (isStopwatchRunning && stopwatchInterval) {
      clearInterval(stopwatchInterval)
      setIsStopwatchRunning(false)
    }
  }

  const resetStopwatch = () => {
    if (stopwatchInterval) {
      clearInterval(stopwatchInterval)
    }
    setStopwatchTime(0)
    setIsStopwatchRunning(false)
  }

  const formatStopwatchTime = (time) => {
    const minutes = Math.floor(time / 6000)
    const seconds = Math.floor((time % 6000) / 100)
    const centiseconds = time % 100
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${centiseconds.toString().padStart(2, "0")}`
  }

  const toggleTask = (taskId, subtaskId = null) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          if (subtaskId) {
            return {
              ...task,
              subtasks: task.subtasks.map((subtask) =>
                subtask.id === subtaskId ? { ...subtask, completed: !subtask.completed } : subtask,
              ),
            }
          } else {
            return { ...task, completed: !task.completed }
          }
        }
        return task
      }),
    )
  }

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("blackbox_authenticated")
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto p-6 space-y-8">
        {/* Header with Glowing Black Box Logo */}
        <div className="text-center space-y-4">
          <div className="relative inline-block">
            <div className="w-24 h-24 mx-auto relative">
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
                  <svg width="32" height="32" viewBox="0 0 200 200" className="animate-pulse">
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Black Box
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Unlock your potential through systematic self-reflection and growth tracking. Transform your inner mysteries
            into measurable progress.
          </p>
        </div>

        {/* Main Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Overall Progress Card */}
          <Card className="bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-white">
                <TrendingUp className="w-5 h-5 text-cyan-400" />
                Overall Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">{overallProgress}%</div>
                <Progress value={overallProgress} className="h-3 bg-gray-800" />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-green-400 font-semibold">Goals Met</div>
                  <div className="text-2xl text-white">12</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-purple-400 font-semibold">Streak</div>
                  <div className="text-2xl text-white">7 days</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Daily Progress Card */}
          <Card className="bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-white">
                <Calendar className="w-5 h-5 text-purple-400" />
                Daily Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">{dailyProgress}%</div>
                <Progress value={dailyProgress} className="h-3 bg-gray-800" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-300">Morning Routine</span>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-300">Learning Session</span>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-300">Reflection Time</span>
                  <div className="w-4 h-4 border border-gray-500 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-white">
                <Zap className="w-5 h-5 text-yellow-400" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Positives Today</span>
                <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                  3
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Areas to Improve</span>
                <Badge variant="secondary" className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                  2
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Active Goals</span>
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  {goals.length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Addictions Tracked</span>
                <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                  {addictions.length}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="goals" className="space-y-6">
          <TabsList className="grid w-full grid-cols-8 bg-black/40 backdrop-blur-md border border-white/10">
            <TabsTrigger value="goals" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
              Goals
            </TabsTrigger>
            <TabsTrigger value="tasks" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              Tasks
            </TabsTrigger>
            <TabsTrigger
              value="positives"
              className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
            >
              Positives
            </TabsTrigger>
            <TabsTrigger
              value="mistakes"
              className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400"
            >
              Mistakes
            </TabsTrigger>
            <TabsTrigger
              value="addictions"
              className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400"
            >
              Addictions
            </TabsTrigger>
            <TabsTrigger
              value="plan"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
            >
              Plan
            </TabsTrigger>
            <TabsTrigger
              value="stopwatch"
              className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-400"
            >
              Timer & Date
            </TabsTrigger>
            <TabsTrigger
              value="editor"
              className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400"
            >
              Editor
            </TabsTrigger>
          </TabsList>

          {/* Goals Tab */}
          <TabsContent value="goals" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Target className="w-6 h-6 text-cyan-400" />
                Goals & Objectives
              </h2>
              <div className="flex gap-2">
                <Input
                  value={newGoalTitle}
                  onChange={(e) => setNewGoalTitle(e.target.value)}
                  placeholder="Enter new goal..."
                  className="bg-white/5 border-white/10 text-white placeholder-gray-400"
                />
                <Button
                  onClick={handleAddGoal}
                  className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/30"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Goal
                </Button>
              </div>
            </div>
            <div className="grid gap-4">
              {goals.map((goal) => {
                const daysUntilTarget = getDaysUntilTarget(goal.targetDate)
                return (
                  <Card key={goal.id} className="bg-black/40 backdrop-blur-md border border-white/10 shadow-xl">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-2">{goal.title}</h3>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
                              {goal.category}
                            </Badge>
                            <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                              Assigned: {formatDate(goal.dateAssigned)}
                            </Badge>
                            <Badge
                              variant="outline"
                              className={`${
                                daysUntilTarget < 0
                                  ? "border-red-500/30 text-red-400"
                                  : daysUntilTarget < 7
                                    ? "border-orange-500/30 text-orange-400"
                                    : "border-green-500/30 text-green-400"
                              }`}
                            >
                              {daysUntilTarget < 0
                                ? `Overdue by ${Math.abs(daysUntilTarget)} days`
                                : daysUntilTarget === 0
                                  ? "Due today"
                                  : `${daysUntilTarget} days left`}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-400 mb-2">Target: {formatDate(goal.targetDate)}</div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-2xl font-bold text-cyan-400">{goal.progress}%</div>
                        </div>
                      </div>
                      <Progress value={goal.progress} className="h-2 bg-gray-800" />
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <ListTodo className="w-6 h-6 text-blue-400" />
                Task Management
              </h2>
              <div className="flex gap-2">
                <Input
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Enter new task..."
                  className="bg-white/5 border-white/10 text-white placeholder-gray-400"
                />
                <Button
                  onClick={handleAddTask}
                  className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Task
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              {tasks.map((task, taskIndex) => (
                <Card key={task.id} className="bg-black/40 backdrop-blur-md border border-white/10 shadow-xl">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          id={`task-${task.id}`}
                          checked={task.completed}
                          onCheckedChange={() => toggleTask(task.id)}
                          className="border-blue-400 data-[state=checked]:bg-blue-500"
                        />
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="border-blue-500/30 text-blue-400 text-xs">
                            #{taskIndex + 1}
                          </Badge>
                          <label
                            htmlFor={`task-${task.id}`}
                            className={`text-lg font-semibold cursor-pointer ${
                              task.completed ? "text-gray-400 line-through" : "text-white"
                            }`}
                          >
                            {task.title}
                          </label>
                        </div>
                      </div>

                      {task.subtasks && task.subtasks.length > 0 && (
                        <div className="ml-8 space-y-2">
                          <h4 className="text-sm font-medium text-gray-300 mb-2">Subtasks:</h4>
                          {task.subtasks.map((subtask, subtaskIndex) => (
                            <div key={subtask.id} className="flex items-center gap-3 py-1">
                              <Checkbox
                                id={`subtask-${subtask.id}`}
                                checked={subtask.completed}
                                onCheckedChange={() => toggleTask(task.id, subtask.id)}
                                className="border-cyan-400 data-[state=checked]:bg-cyan-500"
                              />
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="border-cyan-500/30 text-cyan-400 text-xs">
                                  {taskIndex + 1}.{subtaskIndex + 1}
                                </Badge>
                                <label
                                  htmlFor={`subtask-${subtask.id}`}
                                  className={`text-sm cursor-pointer ${
                                    subtask.completed ? "text-gray-400 line-through" : "text-gray-200"
                                  }`}
                                >
                                  {subtask.title}
                                </label>
                              </div>
                            </div>
                          ))}
                          <div className="mt-2 pt-2 border-t border-white/10">
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                              <CheckSquare className="w-3 h-3" />
                              <span>
                                {task.subtasks.filter((st) => st.completed).length} of {task.subtasks.length} completed
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Positives Tab */}
          <TabsContent value="positives" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-green-400" />
                Positive Achievements
              </h2>
              <div className="flex gap-2">
                <Input
                  value={newPositive}
                  onChange={(e) => setNewPositive(e.target.value)}
                  placeholder="Enter positive achievement..."
                  className="bg-white/5 border-white/10 text-white placeholder-gray-400"
                />
                <Button
                  onClick={handleAddPositive}
                  className="bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Positive
                </Button>
              </div>
            </div>
            <div className="space-y-3">
              {positives.map((positive, index) => (
                <Card key={index} className="bg-black/40 backdrop-blur-md border border-green-500/20 shadow-xl">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-200">{positive}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Mistakes Tab */}
          <TabsContent value="mistakes" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-orange-400" />
                Learning from Mistakes
              </h2>
              <div className="flex gap-2">
                <Input
                  value={newMistake}
                  onChange={(e) => setNewMistake(e.target.value)}
                  placeholder="Enter mistake to learn from..."
                  className="bg-white/5 border-white/10 text-white placeholder-gray-400"
                />
                <Button
                  onClick={handleAddMistake}
                  className="bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border border-orange-500/30"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Mistake
                </Button>
              </div>
            </div>
            <div className="space-y-3">
              {mistakes.map((mistake, index) => (
                <Card key={index} className="bg-black/40 backdrop-blur-md border border-orange-500/20 shadow-xl">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-gray-200 mb-2">{mistake}</p>
                        <Input
                          placeholder="What did you learn from this?"
                          className="bg-white/5 border-white/10 text-white placeholder-gray-400"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Addictions Tab */}
          <TabsContent value="addictions" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Brain className="w-6 h-6 text-red-400" />
                Addiction Management
              </h2>
              <div className="flex gap-2">
                <Input
                  value={newAddictionName}
                  onChange={(e) => setNewAddictionName(e.target.value)}
                  placeholder="Enter habit to track..."
                  className="bg-white/5 border-white/10 text-white placeholder-gray-400"
                />
                <Button
                  onClick={handleAddAddiction}
                  className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Track New Habit
                </Button>
              </div>
            </div>
            <div className="grid gap-4">
              {addictions.map((addiction, index) => (
                <Card key={index} className="bg-black/40 backdrop-blur-md border border-red-500/20 shadow-xl">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{addiction.name}</h3>
                          <Badge
                            variant="outline"
                            className={`mt-1 ${
                              addiction.severity === "High"
                                ? "border-red-500/30 text-red-400"
                                : addiction.severity === "Medium"
                                  ? "border-orange-500/30 text-orange-400"
                                  : "border-yellow-500/30 text-yellow-400"
                            }`}
                          >
                            {addiction.severity} Priority
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-cyan-400">{addiction.progress}%</div>
                          <div className="text-xs text-gray-400">Recovery</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-gray-300">Strategy:</label>
                        <p className="text-gray-200 bg-white/5 p-3 rounded border border-white/10">
                          {addiction.strategy}
                        </p>
                      </div>
                      <Progress value={addiction.progress} className="h-2 bg-gray-800" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Plan Tab */}
          <TabsContent value="plan" className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-purple-400" />
              Development Plan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-black/40 backdrop-blur-md border border-white/10 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white">Short-term Goals (1-3 months)</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={shortTermPlan}
                    onChange={(e) => setShortTermPlan(e.target.value)}
                    placeholder="Define your immediate objectives..."
                    className="min-h-32 bg-white/5 border-white/10 text-white placeholder-gray-400 resize-none"
                  />
                </CardContent>
              </Card>
              <Card className="bg-black/40 backdrop-blur-md border border-white/10 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white">Long-term Vision (6-12 months)</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={longTermPlan}
                    onChange={(e) => setLongTermPlan(e.target.value)}
                    placeholder="Describe your bigger picture goals..."
                    className="min-h-32 bg-white/5 border-white/10 text-white placeholder-gray-400 resize-none"
                  />
                </CardContent>
              </Card>
              <Card className="bg-black/40 backdrop-blur-md border border-white/10 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white">Daily Habits</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={dailyHabits}
                    onChange={(e) => setDailyHabits(e.target.value)}
                    placeholder="List habits you want to build or break..."
                    className="min-h-32 bg-white/5 border-white/10 text-white placeholder-gray-400 resize-none"
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Timer & Date Tab */}
          <TabsContent value="stopwatch" className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Clock className="w-6 h-6 text-yellow-400" />
              Timer & Date Tracking
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Stopwatch Card */}
              <Card className="bg-black/40 backdrop-blur-md border border-white/10 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white text-center">Focus Timer</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-yellow-400 mb-4 digital-display tracking-wider">
                      {formatStopwatchTime(stopwatchTime)}
                    </div>
                    <div className="flex justify-center gap-4">
                      <Button
                        onClick={isStopwatchRunning ? pauseStopwatch : startStopwatch}
                        className={`${
                          isStopwatchRunning
                            ? "bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border-orange-500/30"
                            : "bg-green-500/20 hover:bg-green-500/30 text-green-400 border-green-500/30"
                        } border`}
                      >
                        {isStopwatchRunning ? (
                          <>
                            <Pause className="w-4 h-4 mr-2" />
                            Pause
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Start
                          </>
                        )}
                      </Button>
                      <Button
                        onClick={resetStopwatch}
                        className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30"
                      >
                        <Square className="w-4 h-4 mr-2" />
                        Reset
                      </Button>
                    </div>
                  </div>

                  {/* Session Log */}
                  <div className="border-t border-white/10 pt-4">
                    <h4 className="text-white font-medium mb-3">Recent Sessions</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-white/5 rounded border border-white/10">
                        <span className="text-gray-300 text-sm">Deep Work</span>
                        <Badge variant="outline" className="border-green-500/30 text-green-400 text-xs">
                          45:23
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-white/5 rounded border border-white/10">
                        <span className="text-gray-300 text-sm">Learning</span>
                        <Badge variant="outline" className="border-blue-500/30 text-blue-400 text-xs">
                          32:15
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-white/5 rounded border border-white/10">
                        <span className="text-gray-300 text-sm">Meditation</span>
                        <Badge variant="outline" className="border-purple-500/30 text-purple-400 text-xs">
                          15:00
                        </Badge>
                      </div>
                    </div>
                    <Button
                      onClick={handleSaveSession}
                      className="w-full mt-3 bg-white/5 hover:bg-white/10 text-white border border-white/20 text-sm"
                    >
                      Save Current Session
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Date Tracking Card */}
              <Card className="bg-black/40 backdrop-blur-md border border-white/10 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white text-center">Daily Tracking</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Label className="text-white">Select Date</Label>
                    <Input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>

                  {/* Monthly Progress Tracking */}
                  <div className="space-y-3">
                    <Label className="text-white">
                      Monthly Progress -{" "}
                      {new Date(currentYear, currentMonth).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </Label>
                    <div className="grid grid-cols-7 gap-1 p-3 bg-white/5 rounded border border-white/10">
                      {/* Day headers */}
                      {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                        <div key={index} className="text-center text-xs text-gray-400 font-medium p-1">
                          {day}
                        </div>
                      ))}

                      {/* Calendar days */}
                      {Array.from({ length: getDaysInMonth(currentYear, currentMonth) }, (_, i) => {
                        const day = i + 1
                        const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(
                          2,
                          "0",
                        )}-${String(day).padStart(2, "0")}`
                        const isCompleted = completedDates.has(dateKey)
                        const isToday =
                          day === new Date().getDate() &&
                          currentMonth === new Date().getMonth() &&
                          currentYear === new Date().getFullYear()

                        return (
                          <button
                            key={day}
                            onClick={() => toggleDateCompletion(dateKey)}
                            className={`
            aspect-square flex items-center justify-center text-sm rounded transition-all
            ${
              isCompleted
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : "bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10"
            }
            ${isToday ? "ring-2 ring-cyan-400/50" : ""}
          `}
                          >
                            {isCompleted ? "✗" : day}
                          </button>
                        )
                      })}
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-300">
                        {completedDates.size} of {getDaysInMonth(currentYear, currentMonth)} days completed
                      </span>
                      <span className="text-cyan-400">
                        {Math.round((completedDates.size / getDaysInMonth(currentYear, currentMonth)) * 100)}% complete
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Daily Notes</Label>
                    <Textarea
                      value={currentDateEntry.notes}
                      onChange={(e) => setCurrentDateEntry({ ...currentDateEntry, notes: e.target.value })}
                      placeholder="How was your day? What did you learn?"
                      className="bg-white/5 border-white/10 text-white placeholder-gray-400 resize-none h-20"
                    />
                  </div>

                  <Button
                    onClick={handleSaveDailyEntry}
                    className="w-full bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/30"
                  >
                    Save Daily Entry
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Monthly Overview */}
            <Card className="bg-black/40 backdrop-blur-md border border-white/10 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">Monthly Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4 text-center mb-4">
                  <div className="p-3 bg-white/5 rounded border border-white/10">
                    <div className="text-green-400 font-semibold text-sm">Days Completed</div>
                    <div className="text-2xl text-white">{completedDates.size}</div>
                  </div>
                  <div className="p-3 bg-white/5 rounded border border-white/10">
                    <div className="text-cyan-400 font-semibold text-sm">Completion Rate</div>
                    <div className="text-2xl text-white">
                      {Math.round((completedDates.size / getDaysInMonth(currentYear, currentMonth)) * 100)}%
                    </div>
                  </div>
                  <div className="p-3 bg-white/5 rounded border border-white/10">
                    <div className="text-purple-400 font-semibold text-sm">Avg Mood</div>
                    <div className="text-2xl text-white">7.8</div>
                  </div>
                  <div className="p-3 bg-white/5 rounded border border-white/10">
                    <div className="text-yellow-400 font-semibold text-sm">Avg Productivity</div>
                    <div className="text-2xl text-white">8.2</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-300">Current Streak</span>
                    <Badge variant="outline" className="border-green-500/30 text-green-400">
                      5 days
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-300">Longest Streak</span>
                    <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                      12 days
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-300">Days Remaining</span>
                    <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                      {getDaysInMonth(currentYear, currentMonth) - completedDates.size} days
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced Editor Tab */}
          <TabsContent value="editor" className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-400" />
              Advanced Reflection Editor
            </h2>
            <Card className="bg-black/40 backdrop-blur-md border border-white/10 shadow-xl">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white">Rich Text Editor</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                      onClick={() => {
                        const selection = window.getSelection()
                        if (selection.rangeCount > 0) {
                          const range = selection.getRangeAt(0)
                          const bold = document.createElement("strong")
                          bold.appendChild(range.extractContents())
                          range.insertNode(bold)
                        }
                      }}
                    >
                      Bold
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                      onClick={() => {
                        const selection = window.getSelection()
                        if (selection.rangeCount > 0) {
                          const range = selection.getRangeAt(0)
                          const italic = document.createElement("em")
                          italic.appendChild(range.extractContents())
                          range.insertNode(italic)
                        }
                      }}
                    >
                      Italic
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                      onClick={() => {
                        const textarea = document.querySelector('textarea[placeholder*="detailed reflections"]')
                        if (textarea) {
                          const start = textarea.selectionStart
                          const end = textarea.selectionEnd
                          const text = textarea.value
                          const selectedText = text.substring(start, end)
                          const newText = text.substring(0, start) + "• " + selectedText + text.substring(end)
                          setEditorContent(newText)
                        }
                      }}
                    >
                      List
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={editorContent}
                  onChange={(e) => setEditorContent(e.target.value)}
                  placeholder="Write your detailed reflections, insights, and thoughts here. Use this space for deep self-analysis and planning..."
                  className="min-h-64 bg-white/5 border-white/10 text-white placeholder-gray-400 resize-none text-base leading-relaxed"
                />
                <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
                  <span>Auto-saved 2 minutes ago</span>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSaveEditor}
                      size="sm"
                      className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button
                      onClick={handleExportEditor}
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <Footer settings={settings} onSettingsChange={setSettings} onLogout={handleLogout} />
      </div>
    </div>
  )
}
