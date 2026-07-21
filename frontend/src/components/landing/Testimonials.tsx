import { motion } from 'framer-motion'
import { Star, Sparkles, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Wijaya',
    role: 'Pemilik Kopi Nusantara',
    text: 'Sejak pakai KopiAI, saya tidak perlu bingung bikin konten Instagram tiap hari. Caption langsung jadi dalam 10 detik!',
    rating: 5,
    initials: 'SW',
  },
  {
    name: 'Bambang Sakti',
    role: 'Owner Sakti Coffee',
    text: 'Sales Insight bantu saya tahu jam berapa paling ramai. Omset naik 30% dalam sebulan. Recomended banget!',
    rating: 5,
    initials: 'BS',
  },
  {
    name: 'Dewi Lestari',
    role: 'Roastery Dewi',
    text: 'Finance AI seperti punya akuntan pribadi. Laporan keuangan jadi rapi tanpa ribet. Saya jadi bisa fokus roasting.',
    rating: 5,
    initials: 'DL',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function Testimonials() {
  return (
    <section id="testimoni" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#F8F4EC]/30 to-white dark:from-[#16213e] dark:via-[#1a1a2e]/30 dark:to-[#16213e]" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-600 text-sm font-semibold border border-amber-500/20 mb-6">
            <Sparkles className="w-4 h-4" />
            Testimoni
          </span>
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-coffee-dark dark:text-white">
            Yang Punya Kedai Kopi Sudah Pakai
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-4 text-lg">
            Bergabung dengan 500+ UMKM kopi di Indonesia yang sudah merasakan manfaat KopiAI.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map(({ name, role, text, rating, initials }) => (
            <motion.div
              key={name}
              variants={itemVariants}
              className="group relative p-8 rounded-3xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-800/50 border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:shadow-coffee/10 transition-all duration-500 hover:-translate-y-1"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-coffee/10 dark:text-coffee/20" />

              <div className="flex gap-1 mb-6">
                {Array.from({ length: rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed text-sm">"{text}"</p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-coffee to-emerald flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {initials}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
