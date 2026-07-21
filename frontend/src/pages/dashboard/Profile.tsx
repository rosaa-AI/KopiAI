import { useState, useEffect } from 'react'
import { User, Coffee, CheckCircle2, MapPin, Store, Camera } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { useAuth } from '../../store/auth'
import { db } from '../../lib/db'

export function ProfilePage() {
  const { user, refreshProfile } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [store, setStore] = useState('')
  const [location, setLocation] = useState('')
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (user) {
      setName(user.name || '')
      setEmail(user.email || '')
      setStore(user.store || '')
      setLocation(user.location || '')
    }
  }, [user])

  const handleSave = async () => {
    if (!user) return
    setSaving(true)
    try {
      await db.upsertProfile(user.id, { name, email, store, location })
      await refreshProfile()
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      console.error('Failed to save profile:', err)
    }
    setSaving(false)
  }

  return (
    <div className="animate-fade-in space-y-8">
      <div>
        <h1 className="text-3xl font-poppins font-bold text-coffee-dark dark:text-white flex items-center gap-3">
          <span className="p-3 bg-coffee/10 rounded-2xl text-coffee">
            <User className="w-8 h-8" />
          </span>
          Profil
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Kelola informasi akun dan kedai kopimu.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Avatar Card */}
        <Card className="lg:col-span-1 text-center">
          <div className="relative inline-block">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-coffee to-emerald flex items-center justify-center text-white font-bold text-4xl shadow-xl shadow-coffee/20 mx-auto">
              {name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <button className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-white dark:bg-gray-700 shadow-md flex items-center justify-center border border-gray-200 dark:border-gray-600 hover:bg-gray-50 transition-colors">
              <Camera className="w-4 h-4 text-coffee" />
            </button>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-4">{name || 'Pengguna'}</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{email}</p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-coffee/5 dark:bg-coffee/20 rounded-full text-xs text-coffee font-medium">
            <Coffee className="w-3.5 h-3.5" /> UMKM Coffee Plan
          </div>
          {store && (
            <div className="mt-3 flex items-center justify-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
              <Store className="w-3.5 h-3.5" /> {store}
            </div>
          )}
          {location && (
            <div className="flex items-center justify-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
              <MapPin className="w-3.5 h-3.5" /> {location}
            </div>
          )}
        </Card>

        {/* Edit Form */}
        <Card className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Informasi Akun</h2>
          <div className="space-y-4">
            <Input
              label="Nama Lengkap"
              placeholder="Nama kamu"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="Email"
              type="email"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Nama Kedai"
              placeholder="Contoh: Kopi Nusantara"
              value={store}
              onChange={(e) => setStore(e.target.value)}
            />
            <Input
              label="Lokasi"
              placeholder="Contoh: Jakarta Selatan"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Button className="mt-4" onClick={handleSave} isLoading={saving}>
              {saved ? (
                <><CheckCircle2 className="w-4 h-4" /> Tersimpan</>
              ) : (
                'Simpan Perubahan'
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
