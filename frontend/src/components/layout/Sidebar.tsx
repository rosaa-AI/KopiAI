import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, PenTool, MessageSquare, BrainCircuit,
  History, Settings, BarChart3, Calculator, Globe2, User,
  Coffee, X, Sparkles,
} from 'lucide-react'

const mainMenu = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/dashboard/caption', label: 'AI Caption', icon: PenTool },
  { path: '/dashboard/customer', label: 'AI Customer Reply', icon: MessageSquare },
  { path: '/dashboard/advisor', label: 'AI Business Advisor', icon: BrainCircuit },
  { path: '/dashboard/history', label: 'Riwayat AI', icon: History },
  { path: '/dashboard/settings', label: 'Pengaturan', icon: Settings },
]

const otherTools = [
  { path: '/dashboard/sales', label: 'Sales Insight', icon: BarChart3 },
  { path: '/dashboard/finance', label: 'Finance AI', icon: Calculator },
  { path: '/dashboard/translator', label: 'Translator', icon: Globe2 },
  { path: '/dashboard/profile', label: 'Profile', icon: User },
]

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const location = useLocation()

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden" onClick={onClose} />
      )}

      <aside className={`
        fixed md:sticky top-0 left-0 z-40 h-screen w-72 bg-white dark:bg-[#1e293b] border-r border-gray-100 dark:border-gray-700
        flex flex-col transition-transform duration-300 ease-in-out
        ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 flex items-center justify-between border-b border-gray-100 dark:border-gray-700">
          <NavLink to="/dashboard" className="flex items-center gap-3">
            <div className="bg-coffee p-2 rounded-xl text-white shadow-md shadow-coffee/30">
              <Coffee className="w-6 h-6" />
            </div>
            <span className="font-poppins font-bold text-xl tracking-tight text-coffee-dark dark:text-white">
              Kopi<span className="text-emerald">AI</span>
            </span>
          </NavLink>
          <button onClick={onClose} className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl">
            <X className="w-5 h-5 dark:text-gray-300" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <p className="px-4 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">Menu Utama</p>
          <div className="space-y-0.5 mb-6">
            {mainMenu.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 font-medium text-sm ${
                    isActive
                      ? 'bg-coffee text-white shadow-lg shadow-coffee/20'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </NavLink>
              )
            })}
          </div>

          <p className="px-4 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">Alat Lainnya</p>
          <div className="space-y-0.5">
            {otherTools.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 font-medium text-sm ${
                    isActive
                      ? 'bg-coffee text-white shadow-lg shadow-coffee/20'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </NavLink>
              )
            })}
          </div>
        </nav>

        <div className="p-4 border-t border-gray-100 dark:border-gray-700">
          <div className="bg-gradient-to-br from-coffee/5 to-emerald/5 dark:from-coffee/20 dark:to-emerald/20 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-coffee" />
              <p className="text-xs font-medium text-coffee/80 dark:text-coffee">KopiAI v1.0</p>
            </div>
            <p className="text-[11px] text-gray-400 dark:text-gray-500">IDCamp Developer Challenge 2026</p>
          </div>
        </div>
      </aside>
    </>
  )
}
