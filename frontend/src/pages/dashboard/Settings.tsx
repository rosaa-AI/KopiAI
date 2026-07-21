import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Settings as SettingsIcon, Bell, Shield, Palette, Key, Trash2, LogOut } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { useTheme } from '../../store/theme'
import { useAuth } from '../../store/auth'
import { supabase } from '../../lib/supabase'
import { useHistory } from '../../hooks/useHistory'

export function SettingsPage() {
  const { theme, toggleTheme } = useTheme()
  const { logout, user } = useAuth()
  const { clearAll } = useHistory()
  const navigate = useNavigate()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [passwordMessage, setPasswordMessage] = useState('')

  const handleChangePassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      setPasswordMessage('Password baru minimal 6 karakter')
      return
    }
    setPasswordLoading(true)
    setPasswordMessage('')
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    setPasswordLoading(false)
    if (error) {
      setPasswordMessage(error.message)
    } else {
      setPasswordMessage('Password berhasil diubah!')
      setCurrentPassword('')
      setNewPassword('')
    }
  }

  const handleClearHistory = async () => {
    if (confirm('Hapus seluruh riwayat AI? Tindakan ini tidak bisa dibatalkan.')) {
      await clearAll()
      alert('Riwayat berhasil dihapus.')
    }
  }

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <div className="animate-fade-in space-y-8">
      <div>
        <h1 className="text-3xl font-poppins font-bold text-coffee-dark dark:text-white flex items-center gap-3">
          <span className="p-3 bg-coffee/10 rounded-2xl text-coffee">
            <SettingsIcon className="w-8 h-8" />
          </span>
          Pengaturan
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Atur preferensi akun dan aplikasi.</p>
      </div>

      <div className="space-y-6">
        {/* Ganti Password */}
        <Card>
          <div className="flex items-center gap-4 mb-6">
            <Key className="w-5 h-5 text-coffee" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Ganti Password</h2>
          </div>
          <div className="space-y-4 max-w-md">
            <Input
              label="Password Baru"
              type="password"
              placeholder="Minimal 6 karakter"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {passwordMessage && (
              <p className={`text-sm ${passwordMessage.includes('berhasil') ? 'text-emerald-600' : 'text-red-500'}`}>
                {passwordMessage}
              </p>
            )}
            <Button onClick={handleChangePassword} isLoading={passwordLoading}>
              Update Password
            </Button>
          </div>
        </Card>

        {/* Notifikasi */}
        <Card>
          <div className="flex items-center gap-4 mb-6">
            <Bell className="w-5 h-5 text-coffee" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Notifikasi</h2>
          </div>
          <div className="space-y-4">
            {['Email notifikasi harian', 'Pemberitahuan hasil AI', 'Tips & update fitur'].map((item, i) => (
              <label key={i} className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                <input type="checkbox" className="rounded border-gray-300 text-coffee focus:ring-coffee" defaultChecked={i < 2} />
              </label>
            ))}
          </div>
        </Card>

        {/* Tampilan */}
        <Card>
          <div className="flex items-center gap-4 mb-6">
            <Palette className="w-5 h-5 text-coffee" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Tampilan</h2>
          </div>
          <div className="space-y-4">
            <label className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-700 dark:text-gray-300">Mode Gelap</span>
              <input
                type="checkbox"
                className="rounded border-gray-300 text-coffee focus:ring-coffee"
                checked={theme === 'dark'}
                onChange={toggleTheme}
              />
            </label>
          </div>
        </Card>

        {/* Hapus Riwayat */}
        <Card>
          <div className="flex items-center gap-4 mb-6">
            <Trash2 className="w-5 h-5 text-red-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Hapus Riwayat AI</h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Hapus seluruh riwayat caption, balasan, dan analisis bisnis.
          </p>
          <Button variant="danger" onClick={handleClearHistory} icon={<Trash2 className="w-4 h-4" />}>
            Hapus Semua Riwayat
          </Button>
        </Card>

        {/* Keluar */}
        <Card>
          <div className="flex items-center gap-4 mb-6">
            <LogOut className="w-5 h-5 text-red-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Keluar</h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Keluar dari akun KopiAI.
          </p>
          <Button variant="danger" onClick={handleLogout} icon={<LogOut className="w-4 h-4" />}>
            Logout
          </Button>
        </Card>
      </div>
    </div>
  )
}
