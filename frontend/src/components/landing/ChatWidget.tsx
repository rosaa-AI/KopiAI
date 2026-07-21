import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Coffee, Sparkles } from 'lucide-react'

interface ChatWidgetProps {
  isOpen: boolean
  onToggle: () => void
}

export function ChatWidget({ isOpen, onToggle }: ChatWidgetProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden origin-bottom-right"
          >
            <div className="p-4 bg-gradient-to-r from-coffee to-coffee-dark text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-white/10">
                  <Coffee className="w-4 h-4" />
                </div>
                <span className="font-semibold text-sm">KopiAI Assistant</span>
              </div>
              <button
                onClick={onToggle}
                className="p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 h-64 overflow-y-auto space-y-3">
              <div className="flex items-start gap-2">
                <div className="p-1.5 rounded-lg bg-coffee/10 shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-coffee" />
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-tl-none p-3 max-w-[85%]">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">KopiAI</p>
                  <p className="text-sm text-gray-900 dark:text-white leading-relaxed">
                    Halo! Saya asisten AI KopiAI. Mau lihat demo atau ada yang ingin ditanyakan?
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2 justify-end">
                <div className="bg-coffee/10 rounded-2xl rounded-tr-none p-3 max-w-[85%]">
                  <p className="text-xs text-coffee mb-1">Kamu</p>
                  <p className="text-sm text-coffee-dark dark:text-coffee-light leading-relaxed">
                    Tunjukkan cara kerjanya!
                  </p>
                </div>
                <div className="p-1.5 rounded-lg bg-coffee/10 shrink-0">
                  <Coffee className="w-3.5 h-3.5 text-coffee" />
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="p-1.5 rounded-lg bg-coffee/10 shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-coffee" />
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-tl-none p-3 max-w-[85%]">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">KopiAI</p>
                  <p className="text-sm text-gray-900 dark:text-white leading-relaxed">
                    Tentu! KopiAI bisa bikin caption promosi, balas chat pelanggan, analisis penjualan, dan laporan keuangan. Cukup tulis dengan bahasa sehari-hari. Mau coba gratis 14 hari?
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ketik pesan..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 border-none text-sm focus:outline-none focus:ring-2 focus:ring-coffee/30 placeholder-gray-400"
                />
                <button className="p-2.5 rounded-xl bg-coffee text-white hover:bg-coffee-dark transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={onToggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-coffee to-coffee-dark text-white shadow-xl shadow-coffee/30 flex items-center justify-center hover:shadow-2xl hover:shadow-coffee/40 transition-shadow"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>
    </div>
  )
}
