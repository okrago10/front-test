import { ActionIcon, Group, Paper, Stack, Text } from '@mantine/core'
import { IconX } from '@tabler/icons-react'

interface Props {
  file: File
  onClear: () => void
}

function UploadedFileCard({ file, onClear }: Props) {
  return (
    <Paper withBorder p="xs" radius="md">
      <Group justify="space-between" wrap="nowrap">
        <Stack gap={2} style={{ minWidth: 0 }}>
          <Text size="sm" fw={500} truncate>{file.name}</Text>
          <Text size="xs" c="dimmed">{(file.size / 1024).toFixed(1)} KB</Text>
        </Stack>
        <ActionIcon
          variant="subtle"
          color="gray"
          onClick={onClear}
          aria-label="ファイルを削除"
        >
          <IconX size={18} />
        </ActionIcon>
      </Group>
    </Paper>
  )
}

export default UploadedFileCard
