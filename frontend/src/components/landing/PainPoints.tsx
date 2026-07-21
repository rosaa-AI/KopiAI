import { motion } from 'framer-motion'
import { PenTool, BarChart3, MessageSquare, Calculator, Sparkles, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/Button'

const pains = [
  { icon: PenTool, problem: 'Sulit membuat konten promosi setiap hari', solution: 'AI buat caption IG, TikTok, dan Facebook dalam detik', color: 'from-blue-500/10 to-blue-500/5' },
  { icon: BarChart3, problem: 'Tidak memahami data penjualan', solution: 'AI analisis data dan kasih insight produk terlaris', color: 'from-emerald-500/10 to-emerald-500/5' },
  { icon: MessageSquare, problem: 'Membalas pelanggan memakan waktu', solution: 'AI balas chat dan komplain secara profesional', color: 'from-amber-500/10 to-amber-500/5' },
  { icon: Calculator, problem: 'Pencatatan keuangan masih manual', solution: 'AI ubah catatan harian jadi laporan keuangan rapi', color: 'from-coffee/10 to-coffee/5' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function PainPoints() {
  const navigate = useNavigate()

  return (
    <section id="masalah" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white dark:from-[#16213e] via-[#F8F4EC]/50 dark:via-[#1a1a2e]/50 to-white dark:to-[#16213e]" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coffee/10 text-coffee text-sm font-semibold border border-coffee/20 mb-6">
            <Sparkles className="w-4 h-4" />
            Masalah UMKM
          </span>
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-coffee-dark dark:text-white">
            Mengapa UMKM Kopi Membutuhkan AI?
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-4 text-lg max-w-2xl mx-auto">
            Rata-rata pemilik kedai kopi menghabiskan 15+ jam per minggu untuk hal administratif. 
            Waktu yang seharusnya dipakai untuk meracik kopi dan melayani pelanggan.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {pains.map(({ icon: Icon, problem, solution, color }) => (
            <motion.div
              key={problem}
              variants={itemVariants}
              className="group relative p-6 md:p-8 rounded-3xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-800/50 border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:shadow-coffee/10 transition-all duration-500 hover:-translate-y-1"
            >
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative flex items-start gap-5">
                <div className="p-3 rounded-2xl bg-coffee/5 dark:bg-coffee/10 group-hover:bg-coffee/10 transition-colors">
                  <Icon className="w-6 h-6 text-coffee" />
                </div>
                <div className="flex-1">
                  <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{problem}</p>
                  <p className="text-gray-500 dark:text-gray-400">{solution}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            className="shadow-xl shadow-coffee/20"
            onClick={() => navigate('/login')}
          >
            Mulai Sekarang <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
