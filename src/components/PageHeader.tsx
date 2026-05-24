import { Stack, Text, Title } from '@mantine/core'

function PageHeader() {
  return (
    <Stack gap="md">
      <Title order={1} ta="center">商品データ一括加工ツール</Title>
      <Text size="md" ta="center">商品CSVをアップロードするだけで、価格の自動調整や画像チェックなど、煩雑なデータ整形作業をまとめて実行できます。</Text>
    </Stack>
  )
}

export default PageHeader
