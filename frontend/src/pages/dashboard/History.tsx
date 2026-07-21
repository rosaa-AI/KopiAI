import { useState } from 'react'
import { History as HistoryIcon, Search, ClipboardList, Trash2, Eye, ArrowLeft, Copy, CheckCircle2 } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { MarkdownRenderer } from '../../components/ai/MarkdownRenderer'
import { useHistory, type HistoryItem } from '../../hooks/useHistory'

const tabs = [
  { id: 'caption', label: 'Caption' },
  { id: 'customer', label: 'Customer Reply' },
  { id: 'advisor', label: 'Business Advisor' },
] as const

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('id-ID', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export function HistoryPage() {
  const {
    captionHistory, customerReplyHistory, businessAdvisorHistory,
    removeById, clearAll, loading,
  } = useHistory()
  const [activeTab, setActiveTab] = useState<'caption' | 'customer' | 'advisor'>('caption')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<HistoryItem | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const allItems: Record<string, HistoryItem[]> = {
    caption: captionHistory,
    customer: customerReplyHistory,
    advisor: businessAdvisorHistory,
  }

  const items = allItems[activeTab] || []

  const filtered = search
    ? items.filter((item) =>
        JSON.stringify(item.input).toLowerCase().includes(search.toLowerCase())
      )
    : items

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="animate-fade-in space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-poppins font-bold text-coffee-dark dark:text-white flex items-center gap-3">
            <span className="p-3 bg-coffee/10 rounded-2xl text-coffee">
              <HistoryIcon className="w-8 h-8" />
            </span>
            Riwayat AI
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            {loading ? 'Memuat...' : `${items.length} hasil tersimpan`}
          </p>
        </div>
        {items.length > 0 && (
          <Button
            variant="danger"
            size="sm"
            onClick={() => { if (confirm('Hapus semua riwayat?')) clearAll() }}
            icon={<Trash2 className="w-4 h-4" />}
          >
            Hapus Semua
          </Button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setSelected(null) }}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-coffee text-white shadow-md shadow-coffee/20'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="max-w-sm relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
        <input
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:border-coffee focus:ring-2 focus:ring-coffee/20 transition-all outline-none bg-gray-50/50 dark:bg-[#16213e] dark:text-white"
          placeholder="Cari riwayat..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Detail View */}
      {selected && (
        <Card className="relative">
          <button
            onClick={() => setSelected(null)}
            className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali
          </button>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xl font-semibold text-gray-900 dark:text-white capitalize">{activeTab} History</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(selected.created_at)}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleCopy(selected.output, selected.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors text-sm"
              >
                {copiedId === selected.id ? <CheckCircle2 className="w-4 h-4 text-emerald" /> : <Copy className="w-4 h-4" />}
                {copiedId === selected.id ? 'Tersalin' : 'Copy'}
              </button>
              <button
                onClick={() => { removeById(activeTab, selected.id); setSelected(null) }}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="mb-4 p-4 rounded-2xl bg-gray-50 dark:bg-[#16213e] border border-gray-100 dark:border-gray-700">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Input</p>
            <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-sans">
              {typeof selected.input === 'object' ? JSON.stringify(selected.input, null, 2) : selected.input}
            </pre>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-[#16213e] border border-gray-100 dark:border-gray-700">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Output AI</p>
            <MarkdownRenderer content={selected.output} />
          </div>
        </Card>
      )}

      {/* List View */}
      {!selected && (
        <Card>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400 dark:text-gray-500">
              <ClipboardList className="w-16 h-16 opacity-20 mb-4" />
              <p className="text-sm font-medium">
                {loading ? 'Memuat...' : search ? 'Tidak ada hasil untuk pencarian ini' : 'Belum ada riwayat'}
              </p>
              <p className="text-xs mt-1">
                {search ? 'Coba kata kunci lain' : 'Hasil AI akan muncul di sini'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((item) => {
                const preview = typeof item.input === 'object'
                  ? (item.input as any).productName || JSON.stringify(item.input).slice(0, 80)
                  : String(item.input).slice(0, 80)
                return (
                  <div
                    key={item.id}
                    className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700 cursor-pointer"
                    onClick={() => setSelected(item)}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                        {preview}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{formatDate(item.created_at)}</p>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleCopy(item.output, item.id) }}
                        className="p-2 text-gray-400 hover:text-coffee hover:bg-coffee/5 rounded-xl transition-colors"
                        title="Copy"
                      >
                        {copiedId === item.id ? <CheckCircle2 className="w-4 h-4 text-emerald" /> : <Copy className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelected(item) }}
                        className="p-2 text-gray-400 hover:text-coffee hover:bg-coffee/5 rounded-xl transition-colors"
                        title="Lihat detail"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); removeById(activeTab, item.id) }}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </Card>
      )}
    </div>
  )
}
