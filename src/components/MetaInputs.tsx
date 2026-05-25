import { Stack, TextInput } from '@mantine/core'

function MetaInputs() {
  return (
    <Stack gap="md">
      <TextInput label="出力ファイル名" placeholder="例: products_2026_05" size="md" />
      <TextInput label="処理担当者" placeholder="氏名を入力してください" size="md" />
      <TextInput label="備考" placeholder="処理に関するメモがあれば入力してください" size="md" />
    </Stack>
  )
}

export default MetaInputs
