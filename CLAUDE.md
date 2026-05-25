# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

商品CSVをアップロードして加工処理（価格丸め・画像URLチェック等）を選択するフォーム型ツール。現状は単一画面のフロントエンドのみで、バックエンド処理は未実装。

## コマンド

| 用途 | コマンド |
|---|---|
| 開発サーバ起動 (http://localhost:5173) | `npm run dev` |
| プロダクションビルド | `npm run build` |
| ESLint | `npm run lint` |
| Prettier フォーマット確認 | `npm run format` |
| TypeScript 型チェック | `npm run type-check` |
| ビルド成果物プレビュー | `npm run preview` |

テストフレームワークは未導入。

## 技術スタック

- Vite 8 + React 19 + TypeScript 6
- UI: **Mantine v9**（`@mantine/core` / `@mantine/dropzone` / `@mantine/hooks`）
- アイコン: `@tabler/icons-react`
- ルーティング: `react-router` v7（`createBrowserRouter`）
- スタイリング: PostCSS + `postcss-preset-mantine`

## アーキテクチャ

- エントリ: `src/main.tsx` で `MantineProvider` → `RouterProvider` の順にラップ。Mantine の CSS (`@mantine/core/styles.css`, `@mantine/dropzone/styles.css`) はここで読み込み済み。新しい Mantine モジュールを追加する際はここに CSS import を足す必要がある。
- 画面: `src/App.tsx` がルート `/` の唯一の画面（フォーム本体）。新規画面はルータ定義 (`main.tsx`) への追加が必要。
- 子コンポーネント: `src/components/` にフラット配置（feature 単位で切らない）。

## コンポーネント分割の方針

このリポジトリ固有のルール（CLAUDE が引き継ぐべきもの）:

1. **配置はフラット**: `src/components/` 直下に置く。`features/` のような feature 単位ディレクトリは作らない（凝集性を優先）。
2. **コロケーション**: そのコンポーネントだけが使う定数・型はファイル内に同居させる。横断的な `constants.ts` のような共通ファイルは作らない。
3. **外部 export しないシンボルは `_` プレフィックス**: ファイル内 private 定数は `const _ACCEPTED_MIME = [...]` のように `_` 始まり。モジュール内共有ファイルなら `_shared.ts`。
4. **切り出し基準は React 公式の「complex」シグナル**:
   - 振る舞い・状態を持つ（ハンドラ、useState 等）
   - JSX 内ロジックが複雑（計算・条件分岐）
   - ネストした map/loop
   - 重複がある

   逆に **静的 JSX だけ・5〜10 行程度・props を取らない** ものは `App.tsx` 内にインラインで残す。「行数」だけで切り出し判断しない。

## TypeScript

- **型定義は `type` ではなく `interface` を使う**。`type` は union やマップ型など `interface` で書けないケースに限定する。

