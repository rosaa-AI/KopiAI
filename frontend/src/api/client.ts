import { supabase } from '../lib/supabase'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const { data } = await supabase.auth.getSession()
  const token = data.session?.access_token || null

  const headers: Record<string, string> = {}
  if (!(options?.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(`${API_BASE}${path}`, {
    headers,
    ...options,
  })
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}

export const api = {
  caption: {
    generate: (data: {
      productName: string
      description: string
      price: string
      targetMarket: string
      platform: string
      tone: string
      emoji: string
      length: string
    }) =>
      request<{ success: boolean; data: string; message?: string }>('/caption/generate', {
        method: 'POST', body: JSON.stringify(data),
      }),
  },
  marketing: {
    generate: (data: { productName: string; targetMarket: string; promo: string; image?: File | null }) => {
      const body = new FormData()
      body.append('productName', data.productName)
      body.append('targetMarket', data.targetMarket || '')
      body.append('promo', data.promo || '')
      if (data.image) body.append('image', data.image)
      return request<{ success: boolean; data: string; message?: string }>('/marketing/generate', {
        method: 'POST', body,
      })
    },
  },
  customer: {
    reply: (data: { message: string; tone: string }) =>
      request<{ success: boolean; data: string; message?: string }>('/customer/reply', {
        method: 'POST', body: JSON.stringify(data),
      }),
  },
  sales: {
    analyze: (data: { data: string; file?: File | null }) => {
      const body = new FormData()
      body.append('data', data.data)
      if (data.file) body.append('file', data.file)
      return request<{ success: boolean; data: string; message?: string }>('/sales/analyze', {
        method: 'POST', body,
      })
    },
  },
  finance: {
    report: (data: { text: string }) =>
      request<{ success: boolean; data: string; message?: string }>('/finance/report', {
        method: 'POST', body: JSON.stringify(data),
      }),
  },
  translator: {
    translate: (data: { text: string; language: string }) =>
      request<{ success: boolean; data: string; message?: string }>('/translator/translate', {
        method: 'POST', body: JSON.stringify(data),
      }),
  },
  dashboard: {
    stats: () =>
      request<{ success: boolean; data: { stats: Record<string, { value: string | number; change: string }>; aktivitasTerakhir: Array<{ action: string; detail: string; time: string; status: string }> } }>('/dashboard/stats'),
    insight: () =>
      request<{ success: boolean; data: string; message?: string }>('/dashboard/insight', {
        method: 'POST',
      }),
  },
  advisor: {
    chat: (data: { message: string }) =>
      request<{ success: boolean; data: string; message?: string }>('/advisor/chat', {
        method: 'POST', body: JSON.stringify(data),
      }),
  },
  businessAdvisor: {
    analyze: (data: { category: string; question: string }) =>
      request<{ success: boolean; data: string; message?: string }>('/business-advisor/analyze', {
        method: 'POST', body: JSON.stringify(data),
      }),
  },
}
