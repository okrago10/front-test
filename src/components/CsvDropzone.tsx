import { Stack, Text } from '@mantine/core'
import { Dropzone } from '@mantine/dropzone'

const _ACCEPTED_MIME = ['text/csv', 'application/vnd.ms-excel']

type Props = {
  onDrop: (file: File) => void
}

function CsvDropzone({ onDrop }: Props) {
  return (
    <Dropzone
      onDrop={(files) => onDrop(files[0])}
      // TODO: alert を @mantine/notifications のトーストに差し替える
      onReject={() => alert('CSV ファイルを1つだけアップロードしてください')}
      accept={_ACCEPTED_MIME}
      maxFiles={1}
      bg="gray.1"
    >
      <Stack align="center" justify="center" gap={4} mih={200} style={{ pointerEvents: 'none' }}>
        <Text c="dark.3" fw={500}>ここにファイルをドラッグ&ドロップ</Text>
        <Text c="dimmed" size="sm">またはクリックしてファイルを選択</Text>
      </Stack>
    </Dropzone>
  )
}

export default CsvDropzone
