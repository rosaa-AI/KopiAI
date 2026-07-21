import { useState } from 'react'
import { PenTool, Upload } from 'lucide-react'
import { AIToolLayout } from '../../components/ai/AIToolLayout'
import { Input } from '../../components/ui/Input'
import { Textarea } from '../../components/ui/Textarea'
import { Button } from '../../components/ui/Button'
import { api } from '../../api/client'

export function MarketingAI() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const [form, setForm] = useState({ productName: '', targetMarket: '', promo: '' })
  const [file, setFile] = useState<File | null>(null)

  const handleGenerate = async () => {
    if (!form.productName) return
    setLoading(true)
    const res = await api.marketing.generate({ ...form, image: file })
    setResult(res.success ? res.data : (res.message || 'Gagal'))
    setLoading(false)
  }

  return (
    <AIToolLayout
      title="Marketing AI"
      description="Buat caption Instagram, TikTok, Facebook, dan hashtag dalam hitungan detik."
      icon={<PenTool className="w-8 h-8" />}
      isLoading={loading}
      result={result}
      renderInput={() => (
        <div className="space-y-4">
          <Input
            label="Nama Menu / Produk"
            placeholder="Contoh: Es Kopi Susu Gula Aren"
            value={form.productName}
            onChange={(e) => setForm({ ...form, productName: e.target.value })}
          />
          <Input
            label="Target Pasar"
            placeholder="Contoh: Mahasiswa, Pekerja Kantoran"
            value={form.targetMarket}
            onChange={(e) => setForm({ ...form, targetMarket: e.target.value })}
          />
          <Textarea
            label="Detail Promo"
            placeholder="Contoh: Diskon 20% khusus hari Jumat"
            value={form.promo}
            onChange={(e) => setForm({ ...form, promo: e.target.value })}
          />
          <label className="block cursor-pointer">
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-6 text-center bg-gray-50 dark:bg-[#16213e] hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group">
              <Upload className="w-8 h-8 mx-auto text-gray-400 dark:text-gray-500 group-hover:text-coffee mb-2" />
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {file ? file.name : 'Upload Foto Produk (opsional)'}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">JPG, PNG maks 5MB</p>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </div>
          </label>
          <Button onClick={handleGenerate} className="w-full" icon={<PenTool className="w-4 h-4" />}>
            Buat Konten
          </Button>
        </div>
      )}
    />
  )
}
