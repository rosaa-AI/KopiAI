import { useNavigate } from 'react-router-dom'
import { Coffee, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Button } from '../ui/Button'

const navLinks = [
  { href: '#fitur', label: 'Fitur' },
  { href: '#cara-kerja', label: 'Cara Kerja' },
  { href: '#testimoni', label: 'Testimoni' },
  { href: '#harga', label: 'Harga' },
]

export function Navbar() {
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 w-full z-50"
    >
      <div className="absolute inset-0 bg-[#F8F4EC]/70 dark:bg-[#1a1a2e]/70 backdrop-blur-2xl border-b border-white/20 dark:border-gray-700/20" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        <motion.button
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-2.5"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-coffee/20 blur-xl rounded-full" />
            <Coffee className="w-7 h-7 text-coffee relative" />
          </div>
          <span className="font-poppins font-bold text-2xl tracking-tight text-coffee-dark dark:text-white">
            Kopi<span className="text-emerald">AI</span>
          </span>
        </motion.button>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-coffee dark:hover:text-white transition-colors duration-300 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-coffee rounded-full transition-all duration-300 group-hover:w-3/4" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => navigate('/login')} className="hidden md:inline-flex">
            Masuk
          </Button>
          <Button onClick={() => navigate('/login')} className="shadow-lg shadow-coffee/20">
            Mulai Gratis
          </Button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 hover:bg-white/10 rounded-xl transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-[#F8F4EC]/95 dark:bg-[#1a1a2e]/95 backdrop-blur-2xl overflow-hidden"
          >
            <div className="px-6 py-6 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-coffee/5 hover:text-coffee dark:hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <hr className="border-gray-200/50 dark:border-gray-700/50 my-4" />
              <Button variant="ghost" onClick={() => { setMobileOpen(false); navigate('/login') }} className="w-full justify-center">
                Masuk
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
