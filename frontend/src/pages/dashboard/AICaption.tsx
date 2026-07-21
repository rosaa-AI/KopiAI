import { useState } from 'react'
import { PenTool, Copy, CheckCircle2, RefreshCw, Download } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Textarea } from '../../components/ui/Textarea'
import { Select } from '../../components/ui/Select'
import { MarkdownRenderer } from '../../components/ai/MarkdownRenderer'
import { Sparkles } from 'lucide-react'
import { api } from '../../api/client'
import { useHistory } from '../../hooks/useHistory'
import { withRetry } from '../../lib/retry'

const platformOptions = ['Instagram', 'TikTok', 'Facebook']
const toneOptions = ['Santai', 'Profesional', 'Friendly', 'Gen Z', 'Premium']
const emojiOptions = ['Sedikit', 'Banyak', 'Tanpa Emoji']
const lengthOptions = ['Pendek', 'Sedang', 'Panjang']

const initialForm = {
  productName: '',
  description: '',
  price: '',
  targetMarket: '',
  platform: 'Instagram' as string,
  tone: 'Santai' as string,
  emoji: 'Sedikit' as string,
  length: 'Sedang' as string,
}

export function AICaption() {
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')
  const { addCaption } = useHistory()

  const allFilled = form.productName && form.description

  const handleGenerate = async () => {
    if (!allFilled) return
    setLoading(true)
    setError('')
    setCopied(false)

    try {
      const res = await withRetry(() => api.caption.generate({
        productName: form.productName,
        description: form.description,
        price: form.price,
        targetMarket: form.targetMarket,
        platform: form.platform,
        tone: form.tone,
        emoji: form.emoji,
        length: form.length,
      }))

      if (res.success) {
        setResult(res.data)
        addCaption(form, res.data)
      } else {
        setError(res.message || 'Gagal menghasilkan caption')
      }
    } catch {
      setError('Gagal terhubung ke server. Periksa koneksi dan coba lagi.')
    }

    setLoading(false)
  }

  const handleCopyCaption = () => {
    if (result) {
      const captionMatch = result.match(/## Caption Utama\n([\s\S]*?)(?=\n## \d|$)/)
      const toCopy = captionMatch?.[1]?.trim() || result
      navigator.clipboard.writeText(toCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const handleDownloadTxt = () => {
    if (result) {
      const blob = new Blob([result], { type: 'text/plain;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `caption-${form.productName.toLowerCase().replace(/\s+/g, '-')}.txt`
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div className="animate-fade-in-up">
      <div className="mb-8">
        <h1 className="text-3xl font-poppins font-bold text-coffee-dark dark:text-white flex items-center gap-3">
          <span className="p-3 bg-coffee/10 rounded-2xl text-coffee">
            <PenTool className="w-8 h-8" />
          </span>
          AI Caption
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
          Buat caption Instagram dalam hitungan detik — cukup isi detail produkmu.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Left: Form */}
        <Card glass className="h-fit">
          <h2 className="text-lg font-semibold mb-6 flex items-center text-gray-800 dark:text-white">
            <span className="w-8 h-8 rounded-full bg-coffee/10 flex items-center justify-center mr-3 text-sm font-bold text-coffee">1</span>
            Detail Produk
          </h2>
          <div className="space-y-4">
            <Input
              label="Nama Produk"
              placeholder="Contoh: Es Kopi Susu Gula Aren"
              value={form.productName}
              onChange={(e) => setForm({ ...form, productName: e.target.value })}
            />
            <Textarea
              label="Deskripsi Produk"
              placeholder="Contoh: Kopi susu dengan gula aren asli, pakai susu segar, topping boba"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
            />
            <Input
              label="Harga"
              placeholder="Contoh: Rp 15.000"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
            <Input
              label="Target Pelanggan"
              placeholder="Contoh: Mahasiswa, Pekerja Kantoran"
              value={form.targetMarket}
              onChange={(e) => setForm({ ...form, targetMarket: e.target.value })}
            />
            <Select
              label="Platform"
              value={form.platform}
              onChange={(e) => setForm({ ...form, platform: e.target.value })}
            >
              {platformOptions.map((p) => <option key={p}>{p}</option>)}
            </Select>
            <Select
              label="Gaya Bahasa"
              value={form.tone}
              onChange={(e) => setForm({ ...form, tone: e.target.value })}
            >
              {toneOptions.map((t) => <option key={t}>{t}</option>)}
            </Select>
            <Select
              label="Emoji"
              value={form.emoji}
              onChange={(e) => setForm({ ...form, emoji: e.target.value })}
            >
              {emojiOptions.map((e) => <option key={e}>{e}</option>)}
            </Select>
            <Select
              label="Panjang Caption"
              value={form.length}
              onChange={(e) => setForm({ ...form, length: e.target.value })}
            >
              {lengthOptions.map((l) => <option key={l}>{l}</option>)}
            </Select>

            {error && (
              <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            <Button
              onClick={handleGenerate}
              disabled={loading || !allFilled}
              className="w-full"
              size="lg"
              icon={loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            >
              {loading ? 'AI sedang menulis...' : 'Generate Caption'}
            </Button>
          </div>
        </Card>

        {/* Right: Output */}
        <Card className="flex flex-col relative overflow-hidden bg-gradient-to-b from-white dark:from-[#1e293b] to-cream/30 dark:to-[#1a1a2e]/30">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-coffee to-emerald opacity-60" />

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              <span className="w-8 h-8 rounded-full bg-emerald-100 inline-flex items-center justify-center mr-3 text-sm font-bold text-emerald-600">2</span>
              Hasil AI
            </h2>
            {result && (
              <div className="flex gap-1.5">
                <button
                  onClick={handleCopyCaption}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors text-sm"
                  title="Copy Caption"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-emerald" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Tersalin' : 'Copy Caption'}
                </button>
                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors text-sm"
                  title="Generate Lagi"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  Generate Lagi
                </button>
                <button
                  onClick={handleDownloadTxt}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors text-sm"
                  title="Download TXT"
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
                  <Sparkles className="w-10 h-10 text-coffee animate-pulse" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald rounded-full animate-ping" />
                </div>
                <p className="text-gray-500 dark:text-gray-400 font-medium mt-4">AI sedang menulis caption terbaik...</p>
                <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Berdasarkan detail produk yang kamu berikan</p>
              </div>
            ) : result ? (
              <MarkdownRenderer content={result} />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 space-y-4">
                <PenTool className="w-16 h-16 opacity-20" />
                <p className="text-center max-w-[240px]">
                  Isi detail produk di form sebelah kiri, lalu klik <strong>Generate Caption</strong>.
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
