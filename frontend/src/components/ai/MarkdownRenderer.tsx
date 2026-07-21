interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  if (!content) return null

  const classes = {
    h1: 'text-2xl font-bold mt-7 mb-3 text-gray-900 dark:text-white',
    h2: 'text-xl font-semibold mt-6 mb-2 text-gray-900 dark:text-white',
    h3: 'text-lg font-semibold mt-5 mb-2 text-gray-800 dark:text-gray-100',
    p: 'mb-3 text-gray-700 dark:text-gray-300 leading-relaxed',
    blockquote: 'border-l-4 border-coffee pl-4 italic text-gray-600 dark:text-gray-400 my-3',
    li: 'ml-5 list-disc text-gray-700 dark:text-gray-300 mb-1',
  }

  const html = content
    .replace(/^### (.+)$/gm, `<h3 class="${classes.h3}">$1</h3>`)
    .replace(/^## (.+)$/gm, `<h2 class="${classes.h2}">$1</h2>`)
    .replace(/^# (.+)$/gm, `<h1 class="${classes.h1}">$1</h1>`)
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^> (.+)$/gm, `<blockquote class="${classes.blockquote}">$1</blockquote>`)
    .replace(/^- (.+)$/gm, `<li class="${classes.li}">$1</li>`)
    .replace(/\n\n/g, `</p><p class="${classes.p}">`)
    .replace(/\n/g, '<br />')

  return (
    <div
      className="prose prose-sm max-w-none"
      dangerouslySetInnerHTML={{ __html: `<p class="${classes.p}">${html}</p>` }}
    />
  )
}
