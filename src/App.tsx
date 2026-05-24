import { useState } from 'react'
import { Button, Container, Stack } from '@mantine/core'
import PageHeader from './components/PageHeader'
import CsvDropzone from './components/CsvDropzone'
import UploadedFileCard from './components/UploadedFileCard'
import ProcessingOptions from './components/ProcessingOptions'
import CategorySelect from './components/CategorySelect'
import MetaInputs from './components/MetaInputs'

function App() {
  const [file, setFile] = useState<File | null>(null)

  return (
    <Container size="md" py="md">
      <Stack gap="md">
        <PageHeader />
        <CsvDropzone onDrop={setFile} />
        {file && <UploadedFileCard file={file} onClear={() => setFile(null)} />}
        <ProcessingOptions />
        <CategorySelect />
        <MetaInputs />
        <Button size="lg">実行</Button>
      </Stack>
    </Container>
  )
}

export default App
