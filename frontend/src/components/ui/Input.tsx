import { type InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{label}</label>
      )}
      <input
        className={`w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:border-coffee focus:ring-2 focus:ring-coffee/20 transition-all outline-none bg-gray-50/50 dark:bg-[#16213e] dark:text-white ${error ? 'border-red-400' : ''} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}
