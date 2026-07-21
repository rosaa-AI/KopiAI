import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  PenTool, MessageSquare, BrainCircuit, Sparkles, RefreshCw,
  Activity, FileText, Coffee, BarChart3, Lightbulb,
} from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { useAuth } from '../../store/auth'
import { db } from '../../lib/db'
import { api } from '../../api/client'
import { withRetry } from '../../lib/retry'

const quickActions = [
  { label: 'Buat Caption', icon: PenTool, path: '/dashboard/caption', desc: 'Caption Instagram & hashtag', gradient: 'from-blue-500 to-blue-600' },
  { label: 'Balas Pelanggan', icon: MessageSquare, path: '/dashboard/customer', desc: 'Balasan chat profesional', gradient: 'from-emerald-500 to-emerald-600' },
  { label: 'Analisis Bisnis', icon: BrainCircuit, path: '/dashboard/advisor', desc: 'Konsultasi strategi', gradient: 'from-coffee to-amber-600' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export function DashboardHome() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState({ totalCaption: 0, totalChat: 0, totalAnalisis: 0 })
  const [weeklyData, setWeeklyData] = useState<{ labels: string[]; caption: number[]; customer: number[]; advisor: number[] } | null>(null)
  const [activities, setActivities] = useState<Array<{ id: string; type: string; label: string; preview: string; created_at: string }>>([])
  const [insight, setInsight] = useState('')
  const [insightLoading, setInsightLoading] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchAll = async () => {
    if (!user) return
    setLoading(true)

    try {
      const [s, w, a] = await Promise.all([
        db.getDashboardStats(user.id),
        db.getWeeklyUsage(user.id),
        db.getRecentActivity(user.id),
      ])
      setStats(s)
      setWeeklyData(w)
      setActivities(a)
    } catch (err) {
      console.error('Failed to load dashboard data:', err)
    }

    setLoading(false)
  }

  const fetchInsight = async () => {
    setInsightLoading(true)
    try {
      const res = await withRetry(() => api.dashboard.insight(), { retries: 1 })
      if (res.success) setInsight(res.data)
    } catch {
      setInsight('')
    }
    setInsightLoading(false)
  }

  useEffect(() => { fetchAll(); fetchInsight() }, [user])

  const greeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Selamat Pagi'
    if (hour < 17) return 'Selamat Siang'
    return 'Selamat Sore'
  }

  const today = new Date().toLocaleDateString('id-ID', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  const timeAgo = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return 'Baru saja'
    if (mins < 60) return `${mins} menit lalu`
    const hours = Math.floor(mins / 60)
    if (hours < 24) return `${hours} jam lalu`
    return `${Math.floor(hours / 24)} hari lalu`
  }

  const chartMax = weeklyData
    ? Math.max(...weeklyData.caption, ...weeklyData.customer, ...weeklyData.advisor, 1)
    : 1

  const totalUsage = stats.totalCaption + stats.totalChat + stats.totalAnalisis

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-poppins font-bold text-coffee-dark dark:text-white">
            {greeting()}, {user?.name?.split(' ')[0] || 'Pemilik Kedai'}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
            <Activity className="w-4 h-4" />
            {today}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald/10 rounded-2xl text-emerald-700 dark:text-emerald-300 text-sm font-medium border border-emerald/20">
            <Sparkles className="w-4 h-4" />
            AI Assistant Aktif
          </div>
          <button
            onClick={() => { fetchAll(); fetchInsight() }}
            disabled={loading}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
          >
            <RefreshCw className={`w-4 h-4 text-gray-400 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </motion.div>

      {/* AI Insight Card */}
      <motion.div variants={itemVariants}>
        <Card className="relative overflow-hidden bg-gradient-to-br from-coffee/5 via-emerald/5 to-white dark:from-coffee/10 dark:via-emerald/5 dark:to-[#1e293b] border-coffee/10 dark:border-coffee/20">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-coffee/10 to-transparent rounded-bl-full" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-emerald/10 to-transparent rounded-tr-full" />
          <div className="relative flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-coffee/10 shrink-0">
              {insightLoading ? (
                <Sparkles className="w-6 h-6 text-coffee animate-pulse" />
              ) : (
                <Lightbulb className="w-6 h-6 text-coffee" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-sm font-semibold text-coffee-dark dark:text-white">AI Insight Hari Ini</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-coffee/10 text-coffee font-medium">Gemini AI</span>
              </div>
              {insightLoading ? (
                <div className="space-y-2 mt-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-3/4 animate-pulse" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-1/2 animate-pulse" />
                </div>
              ) : insight ? (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-gray-700 dark:text-gray-300 leading-relaxed"
                >
                  {insight}
                </motion.p>
              ) : (
                <p className="text-gray-400 dark:text-gray-500 text-sm italic">
                  Gagal memuat insight. Klik refresh untuk mencoba lagi.
                </p>
              )}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <motion.div variants={itemVariants}>
          <Card>
            <div className="flex items-start justify-between mb-3">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Total Caption</p>
              <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/40">
                <FileText className="w-4 h-4 text-blue-600 dark:text-blue-300" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
              {loading ? '-' : stats.totalCaption}
            </h3>
            <div className="mt-2 text-xs text-gray-400 dark:text-gray-500">Caption dibuat dengan AI</div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <div className="flex items-start justify-between mb-3">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Total Chat</p>
              <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/40">
                <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-300" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
              {loading ? '-' : stats.totalChat}
            </h3>
            <div className="mt-2 text-xs text-gray-400 dark:text-gray-500">Balasan pelanggan</div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <div className="flex items-start justify-between mb-3">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Total Analisis</p>
              <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-900/40">
                <BrainCircuit className="w-4 h-4 text-amber-600 dark:text-amber-300" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
              {loading ? '-' : stats.totalAnalisis}
            </h3>
            <div className="mt-2 text-xs text-gray-400 dark:text-gray-500">Saran bisnis AI</div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald/10 to-transparent rounded-bl-full" />
            <div className="relative">
              <div className="flex items-start justify-between mb-3">
                <p className="text-gray-500 dark:text-gray-400 text-sm">Total Penggunaan AI</p>
                <div className="p-2 rounded-xl bg-coffee/10">
                  <Sparkles className="w-4 h-4 text-coffee" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                {loading ? '-' : totalUsage}
              </h3>
              <div className="mt-2 text-xs text-gray-400 dark:text-gray-500">Semua fitur AI</div>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-coffee" />
          Aksi Cepat
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickActions.map((action, i) => (
            <motion.button
              key={i}
              variants={itemVariants}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(action.path)}
              className="group relative text-left bg-white dark:bg-[#1e293b] p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br ${action.gradient} opacity-5 group-hover:opacity-10 transition-opacity translate-x-16 -translate-y-16`} />
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-4 shadow-lg transition-transform group-hover:scale-110 duration-300`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{action.label}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{action.desc}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Chart + Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Usage Chart */}
        <motion.div variants={itemVariants}>
          <Card>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-coffee" />
              Grafik Penggunaan AI (7 Hari)
            </h2>
            {weeklyData && weeklyData.labels.length > 0 ? (
              <div className="space-y-4">
                {/* Bars */}
                <div className="flex items-end gap-2 h-44">
                  {weeklyData.labels.map((label, i) => {
                    const total = weeklyData.caption[i] + weeklyData.customer[i] + weeklyData.advisor[i]
                    const height = total > 0 ? Math.max((total / chartMax) * 100, 4) : 4
                    const capH = weeklyData.caption[i] > 0 ? (weeklyData.caption[i] / total) * height : 0
                    const custH = weeklyData.customer[i] > 0 ? (weeklyData.customer[i] / total) * height : 0
                    const advH = weeklyData.advisor[i] > 0 ? (weeklyData.advisor[i] / total) * height : 0

                    return (
                      <div key={label} className="flex-1 flex flex-col items-center gap-1.5">
                        <div className="w-full flex flex-col-reverse rounded-lg overflow-hidden" style={{ height: `${Math.max(height, 4)}px` }}>
                          {weeklyData.advisor[i] > 0 && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: `${advH}px` }}
                              transition={{ duration: 0.5, delay: i * 0.06 }}
                              className="w-full bg-amber-400 rounded-t"
                            />
                          )}
                          {weeklyData.customer[i] > 0 && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: `${custH}px` }}
                              transition={{ duration: 0.5, delay: i * 0.06 }}
                              className="w-full bg-emerald-400"
                            />
                          )}
                          {weeklyData.caption[i] > 0 && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: `${capH}px` }}
                              transition={{ duration: 0.5, delay: i * 0.06 }}
                              className="w-full bg-coffee rounded-b"
                            />
                          )}
                        </div>
                        <span className="text-[10px] text-gray-400 dark:text-gray-500">{label}</span>
                      </div>
                    )
                  })}
                </div>

                {/* Legend */}
                <div className="flex items-center gap-6 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-coffee" />
                    Caption
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-emerald-400" />
                    Chat
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-amber-400" />
                    Analisis
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-44 text-gray-400 dark:text-gray-500 text-sm">
                {loading ? 'Memuat...' : 'Belum ada data minggu ini'}
              </div>
            )}
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={itemVariants}>
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-coffee" />
                Aktivitas Terakhir
              </h2>
              <button
                onClick={() => navigate('/dashboard/history')}
                className="text-sm text-coffee hover:underline font-medium"
              >
                Lihat semua
              </button>
            </div>
            {activities.length === 0 ? (
              <div className="text-center py-8 text-gray-400 dark:text-gray-500 text-sm">
                {loading ? 'Memuat...' : (
                  <div className="flex flex-col items-center gap-2">
                    <Coffee className="w-10 h-10 opacity-20" />
                    Belum ada aktivitas
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {activities.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="flex items-start gap-4 p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <Badge variant={
                      item.type === 'caption' ? 'info' :
                      item.type === 'customer' ? 'success' : 'warning'
                    }>
                      {item.label}
                    </Badge>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700 dark:text-gray-300 truncate">{item.preview}</p>
                    </div>
                    <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap shrink-0">
                      {timeAgo(item.created_at)}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
