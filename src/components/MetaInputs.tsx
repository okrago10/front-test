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

interface MetaField {
  label: string
  placeholder: string
}

// Record にして、MetaInputsValues との項目の過不足を型で検出する
const _FIELDS: Record<keyof MetaInputsValues, MetaField> = {
  outputFileName: { label: '出力ファイル名', placeholder: '例: products_2026_05' },
  assignee: { label: '処理担当者', placeholder: '氏名を入力してください' },
  note: { label: '備考', placeholder: '処理に関するメモがあれば入力してください' },
}
const _FIELD_KEYS = Object.keys(_FIELDS) as (keyof MetaInputsValues)[]

interface Props {
  values: MetaInputsValues
  onChange: (values: MetaInputsValues) => void
}

function MetaInputs({ values, onChange }: Props) {
  return (
    <Stack gap="md">
      {_FIELD_KEYS.map((key) => (
        <TextInput
          key={key}
          label={_FIELDS[key].label}
          placeholder={_FIELDS[key].placeholder}
          size="md"
          value={values[key]}
          onChange={(e) => onChange({ ...values, [key]: e.currentTarget.value })}
        />
      ))}
    </Stack>
  )
}

export default MetaInputs
