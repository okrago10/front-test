import { useState } from 'react'
import { ActionIcon, Container, Group, Paper, Stack, Text, Title } from '@mantine/core'
import { Dropzone } from '@mantine/dropzone'
import { IconX } from '@tabler/icons-react'

function App() {
  const [file, setFile] = useState<File | null>(null)

  return (
    <Container size="md" py="md">
      <Stack gap="md">
        <Title order={1} ta="center">テストタイトル</Title>
        <Text size="md" ta="center">テストテキストテストテキストテストテキストテストテキストテストテキストテストテキスト</Text>
        <Dropzone
          onDrop={(files) => setFile(files[0])}
          // TODO: alert を @mantine/notifications のトーストに差し替える
          onReject={() => alert('CSV ファイルを1つだけアップロードしてください')}
          accept={['text/csv', 'application/vnd.ms-excel']}
          maxFiles={1}
        >
          <Group justify="center" mih={120} style={{ pointerEvents: 'none' }}>
            <Text c="dimmed">ファイルをアップロード</Text>
          </Group>
        </Dropzone>
        {file && (
          <Paper withBorder p="xs" radius="md">
            <Group justify="space-between" wrap="nowrap">
              <Stack gap={2} style={{ minWidth: 0 }}>
                <Text size="sm" fw={500} truncate>{file.name}</Text>
                <Text size="xs" c="dimmed">{(file.size / 1024).toFixed(1)} KB</Text>
              </Stack>
              <ActionIcon
                variant="subtle"
                color="gray"
                onClick={() => setFile(null)}
                aria-label="ファイルを削除"
              >
                <IconX size={18} />
              </ActionIcon>
            </Group>
          </Paper>
        )}
        <Text size="md" ta="center">アップロードしたファイルの内容をもとに、以下の機能で詳細な分析結果や編集オプションをご利用いただけます。</Text>
      </Stack>
    </Container>
  )
}

export default App
