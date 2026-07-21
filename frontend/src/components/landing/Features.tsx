import { motion } from 'framer-motion'
import { PenTool, MessageSquare, BarChart3, Calculator, Globe2, BrainCircuit, Sparkles, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/Button'

const features = [
  { icon: PenTool, title: 'Marketing AI', desc: 'Buat caption Instagram, TikTok, dan Facebook dalam hitungan detik untuk promosi menu baru.', gradient: 'from-blue-500/10 to-blue-500/5', iconBg: 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300' },
  { icon: MessageSquare, title: 'Customer AI', desc: 'Balas komplain dan pertanyaan pelanggan dengan sopan dan profesional, 24/7.', gradient: 'from-emerald-500/10 to-emerald-500/5', iconBg: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-300' },
  { icon: BarChart3, title: 'Sales Insight', desc: 'Ubah data coretan jadi insight produk terlaris dan rekomendasi stok cerdas.', gradient: 'from-purple-500/10 to-purple-500/5', iconBg: 'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300' },
  { icon: Calculator, title: 'Finance AI', desc: 'Cukup ketik bahasa sehari-hari, AI susun cash flow dan laporan keuangan harian.', gradient: 'from-amber-500/10 to-amber-500/5', iconBg: 'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-300' },
  { icon: Globe2, title: 'Translator Menu', desc: 'Terjemahkan menu ke Inggris, Jepang, Arab, atau Mandarin untuk pelanggan asing.', gradient: 'from-cyan-500/10 to-cyan-500/5', iconBg: 'bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-300' },
  { icon: BrainCircuit, title: 'Business Advisor', desc: 'Tanya strategi bisnis langsung dapat saran dari AI mentor berpengalaman.', gradient: 'from-coffee/10 to-coffee/5', iconBg: 'bg-coffee/10 text-coffee' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function Features() {
  const navigate = useNavigate()

  return (
    <section id="fitur" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-white dark:bg-[#16213e]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-coffee/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-coffee/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald/10 text-emerald-600 text-sm font-semibold border border-emerald/20 mb-6">
            <Sparkles className="w-4 h-4" />
            All-in-One Platform
          </span>
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-coffee-dark dark:text-white">
            Satu Platform, Semua Kebutuhan Bisnis
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-4 text-lg max-w-2xl mx-auto">
            Dari konten promosi hingga laporan keuangan — semua bisa kamu lakukan dengan bahasa sehari-hari.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map(({ icon: Icon, title, desc, gradient, iconBg }) => (
            <motion.div
              key={title}
              variants={itemVariants}
              className="group relative p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:shadow-coffee/10 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
            >
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-coffee/0 via-coffee/50 to-coffee/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                <div className={`w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{desc}</p>
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
            variant="outline"
            size="lg"
            className="border-2"
            onClick={() => navigate('/login')}
          >
            Eksplor Semua Fitur <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}


