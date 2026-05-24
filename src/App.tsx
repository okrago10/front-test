import { useState } from 'react'
import { Button, Container, Stack, Text, Title } from '@mantine/core'
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
        <Title order={1} ta="center">商品データ一括加工ツール</Title>
        <Text size="md" ta="center">商品CSVをアップロードするだけで、価格の自動調整や画像チェックなど、煩雑なデータ整形作業をまとめて実行できます。</Text>
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
