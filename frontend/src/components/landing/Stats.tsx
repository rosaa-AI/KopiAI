import { motion } from 'framer-motion'
import { Coffee, FileText, BrainCircuit, Sparkles } from 'lucide-react'

const stats = [
  { icon: Coffee, value: '500+', label: 'UMKM Terbantu', desc: 'Kedai kopi di seluruh Indonesia' },
  { icon: FileText, value: '25.000+', label: 'Konten Dibuat', desc: 'Caption & materi promosi' },
  { icon: BrainCircuit, value: '97%', label: 'Akurasi AI', desc: 'Kualitas hasil yang konsisten' },
  { icon: Sparkles, value: '24/7', label: 'AI Assistant', desc: 'Siap membantu kapan saja' },
]

export function Stats() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-coffee to-coffee-dark" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />

      <div className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-emerald/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
        >
          {stats.map(({ icon: Icon, value, label, desc }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="inline-flex p-3 rounded-2xl bg-white/10 backdrop-blur-sm mb-5 group-hover:bg-white/20 transition-colors">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <motion.p
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-white font-poppins"
              >
                {value}
              </motion.p>
              <p className="text-white/90 font-semibold mt-2">{label}</p>
              <p className="text-white/60 text-sm mt-1">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
