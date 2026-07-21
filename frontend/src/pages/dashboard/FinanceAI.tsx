import { useState } from 'react'
import { Calculator } from 'lucide-react'
import { AIToolLayout } from '../../components/ai/AIToolLayout'
import { Textarea } from '../../components/ui/Textarea'
import { Button } from '../../components/ui/Button'
import { api } from '../../api/client'

export function FinanceAI() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const [text, setText] = useState('')

  const handleGenerate = async () => {
    if (!text) return
    setLoading(true)
    const res = await api.finance.report({ text })
    setResult(res.success ? res.data : (res.message || 'Gagal'))
    setLoading(false)
  }

  return (
    <AIToolLayout
      title="Finance AI"
      description="Ubah catatan transaksi harian jadi laporan keuangan rapi."
      icon={<Calculator className="w-8 h-8" />}
      isLoading={loading}
      result={result}
      renderInput={() => (
        <div className="space-y-4">
          <Textarea
            label="Ceritakan Transaksi Hari Ini"
            placeholder="Contoh: Hari ini laku 30 cup total 600rb. Beli susu habis 150rb, es batu 20rb. Bayar gaji harian barista 100rb."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={8}
          />
          <Button onClick={handleGenerate} className="w-full" icon={<Calculator className="w-4 h-4" />}>
            Buat Laporan Keuangan
          </Button>
        </div>
      )}
    />
  )
}
