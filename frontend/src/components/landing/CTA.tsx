import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Coffee } from 'lucide-react'

export function CTA() {
  const navigate = useNavigate()

  return (
    <section id="harga" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-coffee via-coffee-dark to-coffee" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />

      <div className="absolute top-[-30%] left-[-10%] w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[-30%] right-[-10%] w-[500px] h-[500px] bg-emerald/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative max-w-4xl mx-auto px-4 md:px-8 text-center z-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex p-4 rounded-3xl bg-white/10 backdrop-blur-sm mb-8"
        >
          <Coffee className="w-10 h-10 text-white" />
        </motion.div>

        <h2 className="text-4xl md:text-6xl font-poppins font-bold text-white mb-6 leading-tight">
          Siap Membawa Kedai Kopimu
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-200">
            ke Era AI?
          </span>
        </h2>

        <p className="text-coffee/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          Ribuan UMKM kopi sudah merasakan manfaat KopiAI. Dapatkan akses gratis 14 hari, tanpa kartu kredit.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/login')}
            className="group inline-flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 bg-white text-coffee-dark rounded-2xl font-bold text-lg shadow-2xl shadow-black/20 hover:bg-gray-100 transition-all duration-300"
          >
            Mulai Gratis Sekarang
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/login')}
            className="inline-flex items-center gap-2 px-8 py-4 md:px-10 md:py-5 border-2 border-white/20 text-white rounded-2xl font-semibold hover:bg-white/5 transition-all duration-300"
          >
            <Sparkles className="w-5 h-5" />
            Lihat Demo
          </motion.button>
        </div>

        <div className="flex items-center justify-center gap-8 mt-10 text-coffee/60 text-sm">
          <span>✓ Gratis 14 Hari</span>
          <span>✓ Tanpa Kartu Kredit</span>
          <span>✓ Batal Kapan Saja</span>
        </div>
      </motion.div>
    </section>
  )
}
