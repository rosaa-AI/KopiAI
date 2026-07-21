import { type TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
}

export function Textarea({ label, className = '', ...props }: TextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{label}</label>
      )}
      <textarea
        className={`w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:border-coffee focus:ring-2 focus:ring-coffee/20 transition-all outline-none bg-gray-50/50 dark:bg-[#16213e] dark:text-white resize-y ${className}`}
        {...props}
      />
    </div>
  )
}
