import { Container, Stack, Text, Title } from '@mantine/core'

function App() {
  return (
    <Container size="md" py="md">
      <Stack align="center" gap="md">
        <Title order={1}>テストタイトル</Title>
        <Text size="md" ta="center">テストテキストテストテキストテストテキストテストテキストテストテキストテストテキスト</Text>
      </Stack>
    </Container>
  )
}

export default App
