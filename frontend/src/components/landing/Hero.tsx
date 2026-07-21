import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, Check, Coffee, TrendingUp, BarChart3, BrainCircuit, DollarSign } from 'lucide-react'
import { Button } from '../ui/Button'
import { ChatWidget } from './ChatWidget'

const floatingIcons = [
  { Icon: Coffee, className: 'top-[15%] left-[8%] w-8 h-8 text-coffee/20', delay: 0 },
  { Icon: Sparkles, className: 'top-[25%] right-[12%] w-6 h-6 text-emerald/20', delay: 0.5 },
  { Icon: TrendingUp, className: 'bottom-[30%] left-[5%] w-7 h-7 text-emerald/20', delay: 1 },
  { Icon: BrainCircuit, className: 'bottom-[20%] right-[8%] w-9 h-9 text-coffee/20', delay: 1.5 },
]

const mockupCards = [
  { icon: PenTool, label: 'AI Caption', value: 'Caption Es Kopi Susu siap!', color: 'bg-blue-500', delay: 0.1 },
  { icon: TrendingUp, label: 'Sales Insight', value: '12.4rb views', color: 'bg-emerald-500', delay: 0.2 },
  { icon: DollarSign, label: 'Revenue', value: 'Rp 4.8jt', color: 'bg-amber-500', delay: 0.15 },
  { icon: BrainCircuit, label: 'AI Score', value: 'Bisnis Sehat', color: 'bg-coffee', delay: 0.25 },
]

function PenTool(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  )
}

export function Hero() {
  const navigate = useNavigate()
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <section className="relative min-h-screen overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-[#F8F4EC] via-white to-[#F8F4EC] dark:from-[#1a1a2e] dark:via-[#16213e] dark:to-[#1a1a2e]" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM2RjRFMzciIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

      <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-coffee/5 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-emerald/5 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="absolute top-[40%] left-[60%] w-[300px] h-[300px] bg-blue-500/5 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDuration: '12s' }} />

      {floatingIcons.map(({ Icon, className, delay }) => (
        <motion.div
          key={delay}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay, duration: 1, repeat: Infinity, repeatType: 'reverse', repeatDelay: 3 }}
          className={`absolute hidden lg:block ${className}`}
        >
          <Icon />
        </motion.div>
      ))}

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 w-full min-h-[calc(100dvh-80px)] grid items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coffee/10 text-coffee text-sm font-semibold border border-coffee/20">
                <Sparkles className="w-4 h-4" />
                AI for Coffee Business
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-poppins font-bold text-coffee-dark dark:text-white leading-[1.1] tracking-tight mt-8"
            >
              Biarkan AI Mengurus Bisnis,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-coffee to-amber-600">
                Kamu Fokus Meracik Kopi
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mt-6 leading-relaxed max-w-xl"
            >
              KopiAI membantu UMKM kopi membuat konten promosi, membalas pelanggan, menganalisis penjualan,
              dan menyusun laporan keuangan — cukup dengan bahasa sehari-hari.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mt-10"
            >
              <Button
                size="lg"
                className="w-full sm:w-auto shadow-xl shadow-coffee/25 hover:shadow-2xl hover:shadow-coffee/30 group"
                onClick={() => navigate('/login')}
              >
                Coba Gratis
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto border-2 hover:border-coffee/50"
                onClick={() => setChatOpen(true)}
              >
                <Sparkles className="w-5 h-5" /> Lihat Demo
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-6 mt-10"
            >
              {[
                { icon: Check, text: 'Gratis 14 Hari' },
                { icon: Check, text: 'Tanpa Kartu Kredit' },
                { icon: Check, text: 'Siap Digunakan UMKM' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <div className="p-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40">
                    <Icon className="w-3.5 h-3.5 text-emerald" />
                  </div>
                  {text}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block self-center"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-coffee/20 via-emerald/10 to-blue-500/20 rounded-3xl blur-3xl" />

            <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden backdrop-blur-sm">
              {/* Window controls */}
              <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-gray-100 dark:bg-gray-700 h-6 rounded-lg px-4 flex items-center gap-2 text-xs text-gray-400">
                    <Coffee className="w-3 h-3" /> dashboard.kopiai.id
                  </div>
                </div>
              </div>

              {/* Dashboard content */}
              <div className="p-6 space-y-5">
                {/* Top stat row */}
                <div className="grid grid-cols-3 gap-3">
                  {mockupCards.slice(0, 3).map(({ icon: Icon, label, value, color, delay }) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + delay }}
                      className="p-3 rounded-2xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-700/50 dark:to-gray-800 border border-gray-100 dark:border-gray-700"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`p-1.5 rounded-lg ${color} bg-opacity-10`}>
                          <Icon className={`w-3.5 h-3.5 ${color.replace('bg-', 'text-')}`} />
                        </div>
                        <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{label}</span>
                      </div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{value}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Main content row */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Chart */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-700/50 dark:to-gray-800 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Sales Chart</span>
                      <BarChart3 className="w-4 h-4 text-coffee" />
                    </div>
                    <div className="flex items-end gap-1.5 h-20">
                      {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ delay: 0.6 + i * 0.05, duration: 0.4 }}
                          className="flex-1 rounded-lg bg-gradient-to-t from-coffee to-coffee/60"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Health score */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-coffee/5 to-emerald/5 dark:from-coffee/10 dark:to-emerald/10 border border-coffee/10 dark:border-coffee/20">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Business Health</span>
                      <BrainCircuit className="w-4 h-4 text-emerald" />
                    </div>
                    <div className="text-center">
                      <motion.p
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
                        className="text-3xl font-bold text-coffee-dark dark:text-white"
                      >
                        87%
                      </motion.p>
                      <p className="text-xs text-emerald-600 font-medium mt-1">Sehat & Stabil</p>
                      <div className="mt-3 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '87%' }}
                          transition={{ delay: 1, duration: 0.8 }}
                          className="h-full rounded-full bg-gradient-to-r from-coffee to-emerald"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom: AI Activity */}
                <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-50/50 to-emerald-50/50 dark:from-blue-900/10 dark:to-emerald-900/10 border border-blue-100/50 dark:border-blue-800/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-white dark:bg-gray-700 shadow-sm">
                      <Sparkles className="w-4 h-4 text-coffee" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-900 dark:text-white">AI baru saja membuat konten untukmu</p>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">Caption "Es Kopi Susu Gula Aren" + 12 hashtag</p>
                    </div>
                    <span className="text-[10px] text-gray-400">2m lalu</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <ChatWidget isOpen={chatOpen} onToggle={() => setChatOpen(!chatOpen)} />
    </section>
  )
}
