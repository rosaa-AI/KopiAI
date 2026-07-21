import { useState, type ReactNode } from 'react'
import { Copy, CheckCircle2, Sparkles, BrainCircuit, Download } from 'lucide-react'
import { Card } from '../ui/Card'
import { MarkdownRenderer } from './MarkdownRenderer'

interface AIToolLayoutProps {
  title: string
  description: string
  icon: ReactNode
  isLoading: boolean
  result: string
  renderInput: () => ReactNode
}

export function AIToolLayout({ title, description, icon, isLoading, result, renderInput }: AIToolLayoutProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleDownload = () => {
    if (result) {
      const blob = new Blob([result], { type: 'text/markdown' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${title.toLowerCase().replace(/\s+/g, '-')}-hasil.md`
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div className="animate-fade-in-up">
      <div className="mb-8">
        <h1 className="text-3xl font-poppins font-bold text-coffee-dark dark:text-white flex items-center gap-3">
          <span className="p-3 bg-coffee/10 rounded-2xl text-coffee">{icon}</span>
          {title}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">{description}</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <Card glass className="h-fit">
          <h2 className="text-lg font-semibold mb-6 flex items-center text-gray-800 dark:text-white">
            <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 text-sm font-bold text-gray-500">1</span>
            Input
          </h2>
          {renderInput()}
        </Card>

        <Card className="flex flex-col relative overflow-hidden min-h-[500px] bg-gradient-to-b from-white dark:from-[#1e293b] to-cream/30 dark:to-[#1a1a2e]/30">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-coffee to-emerald opacity-60" />

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold flex items-center text-gray-800 dark:text-white">
              <span className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-3 text-sm font-bold text-emerald-600">2</span>
              Hasil AI
            </h2>
            {result && (
              <div className="flex gap-2">
                <button onClick={handleCopy} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors text-sm">
                  {copied ? <CheckCircle2 className="w-4 h-4 text-emerald" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Tersalin' : 'Salin'}
                </button>
                <button onClick={handleDownload} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors text-sm">
                  <Download className="w-4 h-4" />
                  Unduh
                </button>
              </div>
            )}
          </div>

          <div className="flex-1 bg-white dark:bg-[#16213e] rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-inner overflow-y-auto relative min-h-[300px]">
            {isLoading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 dark:bg-[#16213e]/80 backdrop-blur-sm z-10">
                <Sparkles className="w-8 h-8 text-coffee animate-pulse mb-4" />
                <p className="text-gray-500 dark:text-gray-400 font-medium animate-pulse">AI sedang meracik...</p>
              </div>
            ) : result ? (
              <MarkdownRenderer content={result} />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 space-y-4">
                <BrainCircuit className="w-16 h-16 opacity-20" />
                <p className="text-center max-w-[240px]">Isi form di samping lalu klik generate untuk melihat hasil AI di sini.</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
