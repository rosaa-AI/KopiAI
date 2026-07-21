import { supabase } from './supabase'

export const db = {
  // --- Users ---
  async getUserProfile(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
    if (error) throw error
    return data as {
      id: string
      name: string
      email: string
      store: string
      avatar_url: string
      location: string
      created_at: string
    }
  },

  async upsertProfile(userId: string, profile: { name: string; email: string; store: string; location: string }) {
    const { error } = await supabase
      .from('users')
      .upsert({ id: userId, ...profile, updated_at: new Date().toISOString() })
    if (error) throw error
  },

  // --- Caption History ---
  async getCaptionHistory(userId: string) {
    const { data, error } = await supabase
      .from('caption_history')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data as Array<{
      id: string
      user_id: string
      input: Record<string, string>
      output: string
      created_at: string
    }>
  },

  async addCaptionHistory(userId: string, input: Record<string, string>, output: string) {
    const { error } = await supabase
      .from('caption_history')
      .insert({ user_id: userId, input, output })
    if (error) throw error
  },

  async deleteCaptionHistory(id: string) {
    const { error } = await supabase.from('caption_history').delete().eq('id', id)
    if (error) throw error
  },

  async clearCaptionHistory(userId: string) {
    const { error } = await supabase.from('caption_history').delete().eq('user_id', userId)
    if (error) throw error
  },

  // --- Customer Reply History ---
  async getCustomerReplyHistory(userId: string) {
    const { data, error } = await supabase
      .from('customer_reply_history')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data as Array<{
      id: string
      user_id: string
      input: string
      output: string
      created_at: string
    }>
  },

  async addCustomerReplyHistory(userId: string, input: string, output: string) {
    const { error } = await supabase
      .from('customer_reply_history')
      .insert({ user_id: userId, input, output })
    if (error) throw error
  },

  async deleteCustomerReplyHistory(id: string) {
    const { error } = await supabase.from('customer_reply_history').delete().eq('id', id)
    if (error) throw error
  },

  async clearCustomerReplyHistory(userId: string) {
    const { error } = await supabase.from('customer_reply_history').delete().eq('user_id', userId)
    if (error) throw error
  },

  // --- Business Advisor History ---
  async getBusinessAdvisorHistory(userId: string) {
    const { data, error } = await supabase
      .from('business_advisor_history')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data as Array<{
      id: string
      user_id: string
      input: string
      output: string
      created_at: string
    }>
  },

  async addBusinessAdvisorHistory(userId: string, input: string, output: string) {
    const { error } = await supabase
      .from('business_advisor_history')
      .insert({ user_id: userId, input, output })
    if (error) throw error
  },

  async deleteBusinessAdvisorHistory(id: string) {
    const { error } = await supabase.from('business_advisor_history').delete().eq('id', id)
    if (error) throw error
  },

  async clearBusinessAdvisorHistory(userId: string) {
    const { error } = await supabase.from('business_advisor_history').delete().eq('user_id', userId)
    if (error) throw error
  },

  // --- Dashboard Stats ---
  async getDashboardStats(userId: string) {
    const [captionCount, customerCount, advisorCount] = await Promise.all([
      supabase.from('caption_history').select('*', { count: 'exact', head: true }).eq('user_id', userId),
      supabase.from('customer_reply_history').select('*', { count: 'exact', head: true }).eq('user_id', userId),
      supabase.from('business_advisor_history').select('*', { count: 'exact', head: true }).eq('user_id', userId),
    ])
    return {
      totalCaption: captionCount.count || 0,
      totalChat: customerCount.count || 0,
      totalAnalisis: advisorCount.count || 0,
    }
  },

  async getWeeklyUsage(userId: string) {
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const [captionData, customerData, advisorData] = await Promise.all([
      supabase.from('caption_history').select('created_at').eq('user_id', userId).gte('created_at', sevenDaysAgo.toISOString()),
      supabase.from('customer_reply_history').select('created_at').eq('user_id', userId).gte('created_at', sevenDaysAgo.toISOString()),
      supabase.from('business_advisor_history').select('created_at').eq('user_id', userId).gte('created_at', sevenDaysAgo.toISOString()),
    ])

    const days: string[] = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      days.push(d.toISOString().split('T')[0])
    }

    const countByDate = (items: { created_at: string }[] | null) => {
      const counts: Record<string, number> = {}
      days.forEach((d) => { counts[d] = 0 })
      items?.forEach((item) => {
        const day = item.created_at.split('T')[0]
        if (counts[day] !== undefined) counts[day]++
      })
      return days.map((d) => counts[d])
    }

    const dayLabels = days.map((d) => {
      const date = new Date(d + 'T00:00:00')
      return date.toLocaleDateString('id-ID', { weekday: 'short' })
    })

    return {
      labels: dayLabels,
      caption: countByDate(captionData.data),
      customer: countByDate(customerData.data),
      advisor: countByDate(advisorData.data),
    }
  },

  async getRecentActivity(userId: string) {
    const limit = 10
    const [caption, customer, advisor] = await Promise.all([
      supabase.from('caption_history').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(limit),
      supabase.from('customer_reply_history').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(limit),
      supabase.from('business_advisor_history').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(limit),
    ])

    const combined: Array<{
      id: string
      type: string
      label: string
      preview: string
      created_at: string
    }> = []

    caption.data?.forEach((item) => {
      const input = item.input as Record<string, string>
      combined.push({
        id: item.id, type: 'caption', label: 'AI Caption',
        preview: input.productName || JSON.stringify(item.input).slice(0, 60),
        created_at: item.created_at,
      })
    })
    customer.data?.forEach((item) => {
      const inputStr = item.input as string
      combined.push({
        id: item.id, type: 'customer', label: 'Customer Reply',
        preview: inputStr.slice(0, 60),
        created_at: item.created_at,
      })
    })
    advisor.data?.forEach((item) => {
      const inputStr = item.input as string
      combined.push({
        id: item.id, type: 'advisor', label: 'Business Advisor',
        preview: inputStr.slice(0, 60),
        created_at: item.created_at,
      })
    })

    combined.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    return combined.slice(0, 10)
  },

  // --- Clear All History ---
  async clearAllHistory(userId: string) {
    await Promise.all([
      this.clearCaptionHistory(userId),
      this.clearCustomerReplyHistory(userId),
      this.clearBusinessAdvisorHistory(userId),
    ])
  },
}
