import { useState } from 'react'
import { Alert, Button, Container, Stack, Text, Title } from '@mantine/core'
import CsvDropzone from './components/CsvDropzone'
import UploadedFileCard from './components/UploadedFileCard'
import ProcessingOptions from './components/ProcessingOptions'
import type { ProcessingOptionsValue } from './components/ProcessingOptions'
import CategorySelect from './components/CategorySelect'
import MetaInputs from './components/MetaInputs'
import type { MetaInputsValues } from './components/MetaInputs'
import { useSubmitForm } from './hooks/useSubmitForm'

interface FormInput {
  file: File | null
  processingOptions: ProcessingOptionsValue
  category: string | null
  meta: MetaInputsValues
}

const _INITIAL_FORM_INPUT: FormInput = {
  file: null,
  processingOptions: {},
  category: null,
  meta: {
    outputFileName: '',
    assignee: '',
    note: '',
  },
}

function App() {
  const [formInput, setFormInput] = useState<FormInput>(_INITIAL_FORM_INPUT)
  const { submit, submitting, status, clearStatus } = useSubmitForm()

  const handleSubmit = () => {
    const { file, processingOptions, category, meta } = formInput
    if (!file) return
    submit({ file, processingOptions, category, meta })
  }

  return (
    <Container size="md" py="md">
      <Stack gap="md">
        <Title order={1} ta="center">商品データ一括加工ツール</Title>
        <Text size="md" ta="center">商品CSVをアップロードするだけで、価格の自動調整や画像チェックなど、煩雑なデータ整形作業をまとめて実行できます。</Text>
        <CsvDropzone onDrop={(file) => setFormInput((s) => ({ ...s, file }))} />
        {formInput.file && (
          <UploadedFileCard
            file={formInput.file}
            onClear={() => setFormInput((s) => ({ ...s, file: null }))}
          />
        )}
        <ProcessingOptions
          value={formInput.processingOptions}
          onChange={(processingOptions) => setFormInput((s) => ({ ...s, processingOptions }))}
        />
        <CategorySelect
          value={formInput.category}
          onChange={(category) => setFormInput((s) => ({ ...s, category }))}
        />
        <MetaInputs
          values={formInput.meta}
          onChange={(meta) => setFormInput((s) => ({ ...s, meta }))}
        />
        {status && (
          <Alert color={status.type === 'success' ? 'green' : 'red'} withCloseButton onClose={clearStatus}>
            {status.message}
          </Alert>
        )}
        <Button size="lg" onClick={handleSubmit} loading={submitting} disabled={!formInput.file}>
          実行
        </Button>
      </Stack>
    </Container>
  )
}

export default App
