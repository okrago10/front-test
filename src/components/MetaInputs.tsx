import { Stack, TextInput } from '@mantine/core'

export interface MetaInputsValues {
  outputFileName: string
  assignee: string
  note: string
}

// 初期値は呼び出し側の useState で使うため export する（このファイルの Fast Refresh はフルリロードになる）
// eslint-disable-next-line react-refresh/only-export-components
export const INITIAL_META_INPUTS: MetaInputsValues = {
  outputFileName: '',
  assignee: '',
  note: '',
}

interface Field {
  key: keyof MetaInputsValues
  label: string
  placeholder: string
}

const _FIELDS: Field[] = [
  { key: 'outputFileName', label: '出力ファイル名', placeholder: '例: products_2026_05' },
  { key: 'assignee', label: '処理担当者', placeholder: '氏名を入力してください' },
  { key: 'note', label: '備考', placeholder: '処理に関するメモがあれば入力してください' },
]

interface Props {
  values: MetaInputsValues
  onChange: (values: MetaInputsValues) => void
}

function MetaInputs({ values, onChange }: Props) {
  return (
    <Stack gap="md">
      {_FIELDS.map(({ key, label, placeholder }) => (
        <TextInput
          key={key}
          label={label}
          placeholder={placeholder}
          size="md"
          value={values[key]}
          onChange={(e) => onChange({ ...values, [key]: e.currentTarget.value })}
        />
      ))}
    </Stack>
  )
}

export default MetaInputs
