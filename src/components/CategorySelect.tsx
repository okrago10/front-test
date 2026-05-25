import { TreeSelect } from '@mantine/core'

const _CATEGORY_TREE = [
  {
    value: 'food',
    label: '食品',
    children: [
      { value: 'fruit', label: '果物' },
      { value: 'vegetable', label: '野菜' },
      { value: 'meat', label: '肉' },
      { value: 'fish', label: '魚' },
      { value: 'dairy', label: '乳製品' },
    ],
  },
  {
    value: 'electronics',
    label: '家電',
    children: [
      { value: 'tv', label: 'テレビ' },
      { value: 'phone', label: 'スマホ' },
      { value: 'pc', label: 'パソコン' },
      { value: 'camera', label: 'カメラ' },
      { value: 'audio', label: 'オーディオ' },
    ],
  },
]

function CategorySelect() {
  return (
    <TreeSelect
      label="カテゴリ"
      placeholder="選択してください"
      data={_CATEGORY_TREE}
      expandOnClick
      size="md"
    />
  )
}

export default CategorySelect
