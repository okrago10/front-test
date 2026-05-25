import { Stack, TextInput } from '@mantine/core'

export interface MetaInputsValues {
  outputFileName: string
  assignee: string
  note: string
}

interface Props {
  values: MetaInputsValues
  onChange: (values: MetaInputsValues) => void
}

function MetaInputs({ values, onChange }: Props) {
  return (
    <Stack gap="md">
      <TextInput
        label="出力ファイル名"
        placeholder="例: products_2026_05"
        size="md"
        value={values.outputFileName}
        onChange={(e) => onChange({ ...values, outputFileName: e.currentTarget.value })}
      />
      <TextInput
        label="処理担当者"
        placeholder="氏名を入力してください"
        size="md"
        value={values.assignee}
        onChange={(e) => onChange({ ...values, assignee: e.currentTarget.value })}
      />
      <TextInput
        label="備考"
        placeholder="処理に関するメモがあれば入力してください"
        size="md"
        value={values.note}
        onChange={(e) => onChange({ ...values, note: e.currentTarget.value })}
      />
    </Stack>
  )
}

export default MetaInputs
