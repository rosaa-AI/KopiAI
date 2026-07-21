import { useState } from 'react'
import { MessageSquare, Copy, CheckCircle2, RefreshCw } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Textarea } from '../../components/ui/Textarea'
import { Button } from '../../components/ui/Button'
import { Select } from '../../components/ui/Select'
import { MarkdownRenderer } from '../../components/ai/MarkdownRenderer'
import { Sparkles } from 'lucide-react'
import { api } from '../../api/client'
import { useHistory } from '../../hooks/useHistory'
import { withRetry } from '../../lib/retry'

const toneOptions = [
  'Balasan Profesional',
  'Balasan Ramah',
  'Balasan Singkat',
  'Balasan Formal',
]

export function CustomerAI() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [tone, setTone] = useState(toneOptions[0])
  const { addCustomerReply } = useHistory()

  const handleGenerate = async () => {
    if (!message) return
    setLoading(true)
    setError('')
    setCopied(false)

    try {
      const res = await withRetry(() => api.customer.reply({ message, tone }))

      if (res.success) {
        setResult(res.data)
        addCustomerReply(`Pesan: ${message}\nTone: ${tone}`, res.data)
      } else {
        setError(res.message || 'Gagal menghasilkan balasan')
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
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="animate-fade-in-up">
      <div className="mb-8">
        <h1 className="text-3xl font-poppins font-bold text-coffee-dark dark:text-white flex items-center gap-3">
          <span className="p-3 bg-coffee/10 rounded-2xl text-coffee">
            <MessageSquare className="w-8 h-8" />
          </span>
          AI Customer Reply
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
          Balas chat dan komplain pelanggan dengan cepat dan profesional.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <Card glass className="h-fit">
          <h2 className="text-lg font-semibold mb-6 flex items-center text-gray-800 dark:text-white">
            <span className="w-8 h-8 rounded-full bg-coffee/10 flex items-center justify-center mr-3 text-sm font-bold text-coffee">1</span>
            Pesan Pelanggan
          </h2>
          <div className="space-y-4">
            <Textarea
              label="Pesan dari Pelanggan"
              placeholder="Tempel chat dari pelanggan di sini..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
            />
            <Select
              label="Jenis Balasan"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
            >
              {toneOptions.map((t) => <option key={t}>{t}</option>)}
            </Select>

            {error && (
              <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            <Button
              onClick={handleGenerate}
              disabled={loading || !message}
              className="w-full"
              icon={loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <MessageSquare className="w-4 h-4" />}
            >
              {loading ? 'Memproses...' : 'Generate Reply'}
            </Button>
          </div>
        </Card>

        <Card className="flex flex-col relative overflow-hidden bg-gradient-to-b from-white dark:from-[#1e293b] to-cream/30 dark:to-[#1a1a2e]/30">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-coffee to-emerald opacity-60" />

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              <span className="w-8 h-8 rounded-full bg-emerald-100 inline-flex items-center justify-center mr-3 text-sm font-bold text-emerald-600">2</span>
              Hasil Balasan
            </h2>
            {result && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors text-sm"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Tersalin' : 'Copy'}
              </button>
            )}
          </div>

          <div className="flex-1 bg-white dark:bg-[#16213e] rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-inner overflow-y-auto relative min-h-[300px]">
            {loading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 dark:bg-[#16213e]/80 backdrop-blur-sm z-10">
                <Sparkles className="w-8 h-8 text-coffee animate-pulse mb-4" />
                <p className="text-gray-500 dark:text-gray-400 font-medium animate-pulse">AI sedang menyusun balasan...</p>
              </div>
            ) : result ? (
              <MarkdownRenderer content={result} />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 space-y-4">
                <MessageSquare className="w-16 h-16 opacity-20" />
                <p className="text-center max-w-[240px]">Masukkan pesan pelanggan lalu klik Generate Reply.</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
