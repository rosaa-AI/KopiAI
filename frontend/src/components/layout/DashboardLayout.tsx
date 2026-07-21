import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Menu, Bell, LogOut, Coffee } from 'lucide-react'
import { Sidebar } from './Sidebar'
import { useAuth } from '../../store/auth'

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-cream dark:bg-[#1a1a2e] flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-20 bg-white/80 dark:bg-[#1e293b]/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between px-4 md:px-8 h-16">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
            >
              <Menu className="w-5 h-5 dark:text-gray-300" />
            </button>

            <div className="hidden md:flex items-center gap-3 text-coffee">
              <Coffee className="w-5 h-5" />
              <span className="font-poppins font-bold text-lg">KopiAI</span>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-emerald rounded-full" />
              </button>

              <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700">
                <div className="w-8 h-8 rounded-full bg-coffee/10 flex items-center justify-center text-coffee font-bold text-sm">
                  {user?.name?.charAt(0) || 'A'}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{user?.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
                  title="Keluar"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-4 md:p-8 pb-24">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
