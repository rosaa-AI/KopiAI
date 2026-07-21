import { useState } from 'react'
import { BarChart3, Upload } from 'lucide-react'
import { AIToolLayout } from '../../components/ai/AIToolLayout'
import { Textarea } from '../../components/ui/Textarea'
import { Button } from '../../components/ui/Button'
import { api } from '../../api/client'

export function SalesInsight() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const [dataText, setDataText] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const handleGenerate = async () => {
    if (!dataText && !file) return
    setLoading(true)
    const res = await api.sales.analyze({ data: dataText, file })
    setResult(res.success ? res.data : (res.message || 'Gagal'))
    setLoading(false)
  }

  return (
    <AIToolLayout
      title="Sales Insight AI"
      description="Upload data penjualan dan dapatkan analisis lengkap."
      icon={<BarChart3 className="w-8 h-8" />}
      isLoading={loading}
      result={result}
      renderInput={() => (
        <div className="space-y-4">
          <label className="block">
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-6 text-center bg-gray-50 dark:bg-[#16213e] hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer group">
              <Upload className="w-8 h-8 mx-auto text-gray-400 dark:text-gray-500 group-hover:text-coffee mb-2" />
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {file ? file.name : 'Upload CSV Penjualan'}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Atau ketik manual di bawah</p>
              <input
                type="file"
                className="hidden"
                accept=".csv,.txt"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </div>
          </label>
          <Textarea
            label="Data Penjualan Manual"
            placeholder="Contoh:&#10;Senin: Latte (20), Americano (15), Matcha (5)&#10;Selasa: Latte (25), Americano (10), Croissant (8)"
            value={dataText}
            onChange={(e) => setDataText(e.target.value)}
            rows={6}
          />
          <Button onClick={handleGenerate} className="w-full" icon={<BarChart3 className="w-4 h-4" />}>
            Analisis Data
          </Button>
        </div>
      )}
    />
  )
}
