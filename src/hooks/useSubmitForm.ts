import { useState } from 'react'
import type { ProcessingOptionsValue } from '../components/ProcessingOptions'
import type { MetaInputsValues } from '../components/MetaInputs'

export interface SubmitStatus {
  type: 'success' | 'error'
  message: string
}

export interface SubmitFormPayload {
  file: File
  processingOptions: ProcessingOptionsValue
  category: string | null
  meta: MetaInputsValues
}

export function useSubmitForm() {
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<SubmitStatus | null>(null)

  const submit = async (payload: SubmitFormPayload) => {
    setSubmitting(true)
    setStatus(null)
    try {
      const formData = new FormData()
      formData.append('file', payload.file)
      formData.append('processingOptions', JSON.stringify(payload.processingOptions))
      formData.append('category', payload.category ?? '')
      formData.append('meta', JSON.stringify(payload.meta))
      const res = await fetch('/api/process', { method: 'POST', body: formData })
      if (!res.ok) throw new Error(`status ${res.status}`)
      setStatus({ type: 'success', message: '送信しました' })
    } catch (e) {
      setStatus({
        type: 'error',
        message: `送信に失敗しました（${e instanceof Error ? e.message : '不明なエラー'}）`,
      })
    } finally {
      setSubmitting(false)
    }
  }

  const clearStatus = () => setStatus(null)

  return { submit, submitting, status, clearStatus }
}
