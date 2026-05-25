import { useState } from 'react'
import { Alert, Button, Container, Stack, Text, Title } from '@mantine/core'
import CsvDropzone from './components/CsvDropzone'
import UploadedFileCard from './components/UploadedFileCard'
import ProcessingOptions from './components/ProcessingOptions'
import type { ProcessingOptionsValue } from './components/ProcessingOptions'
import CategorySelect from './components/CategorySelect'
import MetaInputs from './components/MetaInputs'
import type { MetaInputsValues } from './components/MetaInputs'

interface SubmitStatus {
  type: 'success' | 'error'
  message: string
}

function App() {
  const [file, setFile] = useState<File | null>(null)
  const [processingOptions, setProcessingOptions] = useState<ProcessingOptionsValue>({})
  const [category, setCategory] = useState<string | null>(null)
  const [meta, setMeta] = useState<MetaInputsValues>({
    outputFileName: '',
    assignee: '',
    note: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<SubmitStatus | null>(null)

  const handleSubmit = async () => {
    if (!file) return
    setSubmitting(true)
    setStatus(null)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('processingOptions', JSON.stringify(processingOptions))
      formData.append('category', category ?? '')
      formData.append('meta', JSON.stringify(meta))
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

  return (
    <Container size="md" py="md">
      <Stack gap="md">
        <Title order={1} ta="center">商品データ一括加工ツール</Title>
        <Text size="md" ta="center">商品CSVをアップロードするだけで、価格の自動調整や画像チェックなど、煩雑なデータ整形作業をまとめて実行できます。</Text>
        <CsvDropzone onDrop={setFile} />
        {file && <UploadedFileCard file={file} onClear={() => setFile(null)} />}
        <ProcessingOptions value={processingOptions} onChange={setProcessingOptions} />
        <CategorySelect value={category} onChange={setCategory} />
        <MetaInputs values={meta} onChange={setMeta} />
        {status && (
          <Alert color={status.type === 'success' ? 'green' : 'red'} withCloseButton onClose={() => setStatus(null)}>
            {status.message}
          </Alert>
        )}
        <Button size="lg" onClick={handleSubmit} loading={submitting} disabled={!file}>
          実行
        </Button>
      </Stack>
    </Container>
  )
}

export default App
