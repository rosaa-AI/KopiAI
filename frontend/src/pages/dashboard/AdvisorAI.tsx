import { useState } from 'react'
import { BrainCircuit, Copy, CheckCircle2, RefreshCw, Download, Sparkles } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Textarea } from '../../components/ui/Textarea'
import { Select } from '../../components/ui/Select'
import { MarkdownRenderer } from '../../components/ai/MarkdownRenderer'
import { api } from '../../api/client'
import { useHistory } from '../../hooks/useHistory'
import { withRetry } from '../../lib/retry'

const categoryOptions = [
  'Penjualan',
  'Marketing',
  'Harga Produk',
  'Pelanggan',
  'Operasional',
  'Keuangan',
  'Kompetitor',
]

export function AdvisorAI() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')
  const [category, setCategory] = useState(categoryOptions[0])
  const [question, setQuestion] = useState('')
  const { addBusinessAdvisor } = useHistory()

  const handleAnalyze = async () => {
    if (!question.trim()) return
    setLoading(true)
    setError('')
    setCopied(false)

    try {
      const res = await withRetry(() => api.businessAdvisor.analyze({ category, question }))
      if (res.success) {
        setResult(res.data)
        addBusinessAdvisor(`[${category}] ${question}`, res.data)
      } else {
        setError(res.message || 'Gagal menganalisis')
      }
    } catch {
      setError('Gagal terhubung ke server. Periksa koneksi dan coba lagi.')
    }

    setLoading(false)
  }

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const handleDownload = () => {
    if (result) {
      const blob = new Blob([result], { type: 'text/markdown;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `analisis-bisnis-${Date.now()}.md`
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div className="animate-fade-in-up">
      <div className="mb-8">
        <h1 className="text-3xl font-poppins font-bold text-coffee-dark dark:text-white flex items-center gap-3">
          <span className="p-3 bg-coffee/10 rounded-2xl text-coffee">
            <BrainCircuit className="w-8 h-8" />
          </span>
          AI Business Advisor
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
          Konsultasi bisnis gratis dengan AI. Ceritakan masalahmu, dapatkan solusi instan.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Left: Input */}
        <Card glass className="h-fit">
          <h2 className="text-lg font-semibold mb-6 flex items-center text-gray-800 dark:text-white">
            <span className="w-8 h-8 rounded-full bg-coffee/10 flex items-center justify-center mr-3 text-sm font-bold text-coffee">1</span>
            Input Analisis
          </h2>
          <div className="space-y-4">
            <Select
              label="Kategori Masalah"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categoryOptions.map((c) => <option key={c}>{c}</option>)}
            </Select>

            <Textarea
              label="Pertanyaan atau Keluhan"
              placeholder="Contoh: Penjualan kopi susu saya turun minggu ini."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={6}
            />

            {error && (
              <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            <Button
              onClick={handleAnalyze}
              disabled={loading || !question.trim()}
              className="w-full"
              size="lg"
              icon={loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            >
              {loading ? 'AI Menganalisis...' : 'Analisis dengan AI'}
            </Button>
          </div>
        </Card>

        {/* Right: Output */}
        <Card className="flex flex-col relative overflow-hidden bg-gradient-to-b from-white dark:from-[#1e293b] to-cream/30 dark:to-[#1a1a2e]/30">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-coffee to-emerald opacity-60" />

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              <span className="w-8 h-8 rounded-full bg-emerald-100 inline-flex items-center justify-center mr-3 text-sm font-bold text-emerald-600">2</span>
              Hasil Analisis AI
            </h2>
            {result && (
              <div className="flex gap-1.5">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors text-sm"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-emerald" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Tersalin' : 'Copy Hasil'}
                </button>
                <button
                  onClick={handleAnalyze}
                  disabled={loading}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors text-sm"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  Analisis Ulang
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors text-sm"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            )}
          </div>

          <div className="flex-1 bg-white dark:bg-[#16213e] rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-inner overflow-y-auto relative min-h-[450px]">
            {loading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 dark:bg-[#16213e]/80 backdrop-blur-sm z-10">
                <div className="relative">
                  <BrainCircuit className="w-10 h-10 text-coffee animate-pulse" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald rounded-full animate-ping" />
                </div>
                <p className="text-gray-500 dark:text-gray-400 font-medium mt-4">AI sedang menganalisis bisnismu...</p>
                <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Memberikan solusi terbaik untuk kedaimu</p>
              </div>
            ) : result ? (
              <div className="space-y-4">
                <div className="p-2 rounded-xl bg-coffee/5 border border-coffee/10 text-xs text-coffee font-medium inline-block">
                  {category}
                </div>
                <MarkdownRenderer content={result} />
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 space-y-4">
                <BrainCircuit className="w-16 h-16 opacity-20" />
                <p className="text-center max-w-[260px]">
                  Pilih kategori dan tulis pertanyaan bisnismu, lalu klik <strong>Analisis dengan AI</strong>.
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
