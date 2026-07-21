import { Component, type ReactNode, type ErrorInfo } from 'react'
import { Coffee, AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <div className="min-h-screen bg-cream dark:bg-[#1a1a2e] flex items-center justify-center p-8">
          <div className="max-w-md text-center space-y-6">
            <div className="inline-flex p-4 rounded-3xl bg-coffee/10">
              <AlertTriangle className="w-12 h-12 text-coffee" />
            </div>
            <div>
              <h2 className="text-2xl font-poppins font-bold text-coffee-dark dark:text-white mb-2">
                Terjadi Kesalahan
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Maaf, terjadi kesalahan yang tidak terduga. Silakan muat ulang halaman.
              </p>
            </div>
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 px-6 py-3 bg-coffee text-white rounded-2xl font-medium hover:bg-coffee-dark transition-colors shadow-lg shadow-coffee/20"
            >
              <RefreshCw className="w-4 h-4" />
              Muat Ulang
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
