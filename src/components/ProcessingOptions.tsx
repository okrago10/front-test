import { Group, Paper, Radio, Stack, Text } from '@mantine/core'

const _PROCESSING_ITEMS = ['価格の自動丸め処理', '商品画像URLの有効性チェック']

export type ProcessingOptionsValue = Record<string, '必要' | '不要'>

interface Props {
  value: ProcessingOptionsValue
  onChange: (value: ProcessingOptionsValue) => void
}

function ProcessingOptions({ value, onChange }: Props) {
  return (
    <Stack gap="md">
      <Text size="md" ta="center">アップロードした商品CSVに対して、以下の処理を実行できます。必要な処理を選択してください。</Text>
      <Stack gap="xs">
        {_PROCESSING_ITEMS.map((item) => (
          <Radio.Group
            key={item}
            value={value[item] ?? '不要'}
            onChange={(v) => {
              if (v !== '必要' && v !== '不要') return
              onChange({ ...value, [item]: v })
            }}
            name={`needed-${item}`}
            label={item}
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
