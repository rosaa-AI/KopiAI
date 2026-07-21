import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Coffee, ArrowRight } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { useAuth } from '../store/auth'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login, resetPassword } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const result = await login(email, password)
    setLoading(false)
    if (result.success) {
      navigate('/dashboard')
    } else {
      setError(result.message || 'Login gagal')
    }
  }

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Masukkan email terlebih dahulu')
      return
    }
    setLoading(true)
    const result = await resetPassword(email)
    setLoading(false)
    if (result.success) {
      setError('')
      alert('Tautan reset sandi telah dikirim ke email Anda.')
    } else {
      setError(result.message || 'Gagal mengirim email reset')
    }
  }

  return (
    <div className="min-h-screen bg-cream dark:bg-[#1a1a2e] flex flex-col justify-center items-center relative overflow-hidden">
      <div className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] bg-coffee rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-emerald rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000" />

      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 text-gray-500 dark:text-gray-400 hover:text-coffee-dark dark:hover:text-white flex items-center gap-2 transition-colors text-sm font-medium"
      >
        <ArrowRight className="w-4 h-4 rotate-180" /> Beranda
      </button>

      <div className="w-full max-w-md px-6 relative z-10 animate-fade-in-up">
        <div className="text-center mb-10">
          <div className="inline-flex bg-white dark:bg-[#1e293b] p-4 rounded-3xl shadow-xl shadow-coffee/10 mb-6 animate-float">
            <Coffee className="w-10 h-10 text-coffee" />
          </div>
          <h1 className="text-3xl font-poppins font-bold text-coffee-dark dark:text-white">Masuk ke KopiAI</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Mulai kelola bisnismu dengan cerdas.</p>
        </div>

        <Card glass className="border-white/40 dark:border-gray-600/40">
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

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Kata Sandi</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-600 focus:border-coffee focus:ring-2 focus:ring-coffee/20 transition-all outline-none bg-gray-50/50 dark:bg-[#16213e] dark:text-white"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-600 dark:text-gray-400 cursor-pointer">
                <input type="checkbox" className="mr-2 rounded border-gray-300 text-coffee focus:ring-coffee" defaultChecked />
                Ingat saya
              </label>
              <button type="button" onClick={handleForgotPassword} className="text-coffee hover:underline font-medium">
                Lupa sandi?
              </button>
            </div>

            <Button type="submit" className="w-full py-4 text-base" isLoading={loading}>
              Masuk Dashboard
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
            Belum punya akun?{' '}
            <button type="button" onClick={() => navigate('/register')} className="text-coffee font-medium hover:underline">
              Daftar gratis
            </button>
          </p>
        </Card>
      </div>
    </div>
  )
}
