import { Group, Paper, Radio, Stack, Text } from '@mantine/core'

export interface ProcessingOptionsValue {
  priceRounding: boolean
  imageUrlCheck: boolean
}

// 初期値は呼び出し側の useState で使うため export する（このファイルの Fast Refresh はフルリロードになる）
// eslint-disable-next-line react-refresh/only-export-components
export const INITIAL_PROCESSING_OPTIONS: ProcessingOptionsValue = {
  priceRounding: false,
  imageUrlCheck: false,
}

// Record にして、ProcessingOptionsValue との項目の過不足を型で検出する
const _PROCESSING_LABELS: Record<keyof ProcessingOptionsValue, string> = {
  priceRounding: '価格の自動丸め処理',
  imageUrlCheck: '商品画像URLの有効性チェック',
}
const _PROCESSING_KEYS = Object.keys(_PROCESSING_LABELS) as (keyof ProcessingOptionsValue)[]

interface Props {
  value: ProcessingOptionsValue
  onChange: (value: ProcessingOptionsValue) => void
}

function ProcessingOptions({ value, onChange }: Props) {
  return (
    <Stack gap="md">
      <Text size="md" ta="center">アップロードした商品CSVに対して、以下の処理を実行できます。必要な処理を選択してください。</Text>
      <Stack gap="xs">
        {_PROCESSING_KEYS.map((key) => (
          <Radio.Group
            key={key}
            value={value[key] ? '必要' : '不要'}
            onChange={(v) => onChange({ ...value, [key]: v === '必要' })}
            name={`needed-${key}`}
            label={_PROCESSING_LABELS[key]}
            labelProps={{ fz: 'md' }}
          >
            <Paper withBorder p="sm" radius="md" mt="xs">
              <Group gap="md">
                <Radio value="必要" label="必要" />
                <Radio value="不要" label="不要" />
              </Group>
            </Paper>
          </Radio.Group>
        ))}
      </Stack>
    </Stack>
  )
}

export default ProcessingOptions
