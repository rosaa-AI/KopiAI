import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Coffee, ArrowRight, Send } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { useAuth } from '../store/auth'

export function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { resetPassword } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const result = await resetPassword(email)
    setLoading(false)
    if (result.success) {
      setSent(true)
    } else {
      setError(result.message || 'Gagal mengirim email reset')
    }
  }

  return (
    <div className="min-h-screen bg-cream dark:bg-[#1a1a2e] flex flex-col justify-center items-center relative overflow-hidden">
      <div className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] bg-coffee rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-emerald rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000" />

      <button
        onClick={() => navigate('/login')}
        className="absolute top-6 left-6 text-gray-500 dark:text-gray-400 hover:text-coffee-dark dark:hover:text-white flex items-center gap-2 transition-colors text-sm font-medium"
      >
        <ArrowRight className="w-4 h-4 rotate-180" /> Kembali
      </button>

      <div className="w-full max-w-md px-6 relative z-10 animate-fade-in-up">
        <div className="text-center mb-10">
          <div className="inline-flex bg-white dark:bg-[#1e293b] p-4 rounded-3xl shadow-xl shadow-coffee/10 mb-6 animate-float">
            <Coffee className="w-10 h-10 text-coffee" />
          </div>
          <h1 className="text-3xl font-poppins font-bold text-coffee-dark dark:text-white">Lupa Sandi?</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Masukkan email kamu dan kami akan kirim tautan reset.</p>
        </div>

        <Card glass className="border-white/40 dark:border-gray-600/40">
          {sent ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center mx-auto">
                <Send className="w-8 h-8 text-emerald-600 dark:text-emerald-300" />
              </div>
              <p className="text-gray-900 dark:text-white font-medium">Email terkirim!</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Cek kotak masuk email kamu untuk tautan reset sandi.</p>
              <Button variant="outline" onClick={() => navigate('/login')}>Kembali ke Login</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-600 focus:border-coffee focus:ring-2 focus:ring-coffee/20 transition-all outline-none bg-gray-50/50 dark:bg-[#16213e] dark:text-white"
                  placeholder="nama@email.com"
                  required
                />
              </div>
              <Button type="submit" className="w-full py-4 text-base" isLoading={loading}>
                Kirim Tautan Reset
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  )
}
