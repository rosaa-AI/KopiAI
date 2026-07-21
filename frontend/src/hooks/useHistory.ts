import { useState, useEffect, useCallback } from 'react'
import { db } from '../lib/db'
import { useAuth } from '../store/auth'

export interface HistoryItem {
  id: string
  user_id: string
  input: any
  output: string
  created_at: string
}

export function useHistory() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [captionHistory, setCaptionHistory] = useState<HistoryItem[]>([])
  const [customerReplyHistory, setCustomerReplyHistory] = useState<HistoryItem[]>([])
  const [businessAdvisorHistory, setBusinessAdvisorHistory] = useState<HistoryItem[]>([])

  const loadAll = useCallback(async () => {
    if (!user) return
    setLoading(true)
    try {
      const [c, cr, ba] = await Promise.all([
        db.getCaptionHistory(user.id),
        db.getCustomerReplyHistory(user.id),
        db.getBusinessAdvisorHistory(user.id),
      ])
      setCaptionHistory(c as unknown as HistoryItem[])
      setCustomerReplyHistory(cr as unknown as HistoryItem[])
      setBusinessAdvisorHistory(ba as unknown as HistoryItem[])
    } catch (err) {
      console.error('Failed to load history:', err)
    }
    setLoading(false)
  }, [user])

  useEffect(() => {
    loadAll()
  }, [loadAll])

  const addCaption = useCallback(async (input: Record<string, string>, output: string) => {
    if (!user) return
    await db.addCaptionHistory(user.id, input, output)
    await loadAll()
  }, [user, loadAll])

  const addCustomerReply = useCallback(async (input: string, output: string) => {
    if (!user) return
    await db.addCustomerReplyHistory(user.id, input, output)
    await loadAll()
  }, [user, loadAll])

  const addBusinessAdvisor = useCallback(async (input: string, output: string) => {
    if (!user) return
    await db.addBusinessAdvisorHistory(user.id, input, output)
    await loadAll()
  }, [user, loadAll])

  const removeById = useCallback(async (table: string, id: string) => {
    switch (table) {
      case 'caption': await db.deleteCaptionHistory(id); break
      case 'customer': await db.deleteCustomerReplyHistory(id); break
      case 'advisor': await db.deleteBusinessAdvisorHistory(id); break
    }
    await loadAll()
  }, [loadAll])

  const clearAll = useCallback(async () => {
    if (!user) return
    await db.clearAllHistory(user.id)
    setCaptionHistory([])
    setCustomerReplyHistory([])
    setBusinessAdvisorHistory([])
  }, [user])

  return {
    loading, captionHistory, customerReplyHistory, businessAdvisorHistory,
    addCaption, addCustomerReply, addBusinessAdvisor,
    removeById, clearAll, reload: loadAll,
  } as const
}
