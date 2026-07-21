import { useState } from 'react'
import { Globe2, ArrowRightLeft } from 'lucide-react'
import { AIToolLayout } from '../../components/ai/AIToolLayout'
import { Textarea } from '../../components/ui/Textarea'
import { Select } from '../../components/ui/Select'
import { Button } from '../../components/ui/Button'
import { api } from '../../api/client'

export function Translator() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const [form, setForm] = useState({ text: '', language: 'English' })

  const handleGenerate = async () => {
    if (!form.text) return
    setLoading(true)
    const res = await api.translator.translate(form)
    setResult(res.success ? res.data : (res.message || 'Gagal'))
    setLoading(false)
  }

  return (
    <AIToolLayout
      title="Translator Menu"
      description="Terjemahkan deskripsi menu ke berbagai bahasa untuk menjangkau pelanggan internasional."
      icon={<Globe2 className="w-8 h-8" />}
      isLoading={loading}
      result={result}
      renderInput={() => (
        <div className="space-y-4">
          <Textarea
            label="Deskripsi Menu (Bahasa Indonesia)"
            placeholder="Contoh: Es Kopi Susu Gula Aren adalah minuman kopi susu khas Nusantara..."
            value={form.text}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
            rows={6}
          />
          <Select
            label="Bahasa Target"
            value={form.language}
            onChange={(e) => setForm({ ...form, language: e.target.value })}
          >
            <option>English</option>
            <option>Japanese (日本語)</option>
            <option>Arabic (العربية)</option>
            <option>Chinese (中文)</option>
          </Select>
          <Button onClick={handleGenerate} className="w-full" icon={<ArrowRightLeft className="w-4 h-4" />}>
            Terjemahkan
          </Button>
        </div>
      )}
    />
  )
}
