import { motion } from 'framer-motion'
import { Sparkles, FileText, BrainCircuit, CheckCircle2, Download } from 'lucide-react'

const steps = [
  { icon: FileText, title: 'Upload Data', desc: 'Tulis kebutuhanmu dengan bahasa sehari-hari. Upload menu, data penjualan, atau catatan keuangan.', step: '1' },
  { icon: BrainCircuit, title: 'AI Memproses', desc: 'Gemini AI memproses data dan memahami konteks bisnis kedai kopimu secara otomatis.', step: '2' },
  { icon: CheckCircle2, title: 'Hasil Instan', desc: 'Dapatkan caption, balasan chat, analisis, laporan keuangan, atau terjemahan dalam hitungan detik.', step: '3' },
  { icon: Download, title: 'Simpan & Gunakan', desc: 'Salin, unduh, dan gunakan hasilnya langsung. Semua tersimpan di riwayat akunmu.', step: '4' },
]

export function HowItWorks() {
  return (
    <section id="cara-kerja" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#F8F4EC]/50 to-white/50 dark:from-[#1a1a2e]/50 dark:to-[#16213e]/50" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coffee/10 text-coffee text-sm font-semibold border border-coffee/20 mb-6">
            <Sparkles className="w-4 h-4" />
            Cara Kerja
          </span>
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-coffee-dark dark:text-white">
            Mulai dalam Hitungan Menit
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-4 text-lg max-w-2xl mx-auto">
            Tidak perlu install atau pelajari teknologi. Cukup tulis apa yang kamu butuhkan, AI yang bekerja.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-coffee/30 via-emerald/30 to-coffee/30 hidden md:block" />

          <div className="space-y-12 md:space-y-16">
            {steps.map(({ icon: Icon, title, desc, step }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start gap-6 md:gap-10 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Step number */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-coffee to-emerald text-white flex items-center justify-center text-xl font-bold shadow-lg shadow-coffee/20">
                    {step}
                  </div>
                </div>

                {/* Content */}
                <div className={`flex-1 md:w-1/2 ${i % 2 === 1 ? 'md:text-right' : ''}`}>
                  <div className="md:hidden flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-coffee to-emerald text-white flex items-center justify-center text-lg font-bold shadow-lg shrink-0">
                      {step}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
                  </div>
                  <div className="hidden md:block p-6 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-2xl bg-coffee/5 dark:bg-coffee/10">
                        <Icon className="w-6 h-6 text-coffee" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{desc}</p>
                  </div>
                </div>

                {/* Spacer for the other side */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile view: simpler layout */}
        <div className="mt-12 md:hidden space-y-6">
          {steps.map(({ title, desc, step }) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-lg"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-coffee to-emerald text-white flex items-center justify-center text-base font-bold shrink-0">
                  {step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed ml-16">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
