import type { ReactNode, HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  hover?: boolean
  glass?: boolean
}

export function Card({ children, className = '', hover, glass, ...props }: CardProps) {
  return (
    <div
        className={`
        rounded-3xl p-6 md:p-8 border transition-all duration-300
        ${glass
          ? 'bg-white/60 dark:bg-[#1e293b]/60 backdrop-blur-xl border-white/40 dark:border-gray-600/40 shadow-xl'
          : 'bg-white dark:bg-[#1e293b] border-gray-100 dark:border-gray-700 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]'
        }
        ${hover ? 'hover:shadow-xl hover:-translate-y-0.5' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}
