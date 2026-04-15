作業完了後の一連フローを実行します。GitHub Issue作成 → 作業ログ → レビューを順番に進めてください。
各ステップでユーザーに確認しながら進めること。

## Step 1: 現在の変更内容を確認

- `git status` で変更ファイルを確認
- `git diff` で差分内容を確認
- 変更内容のサマリーをユーザーに報告

## Step 2: GitHub Issue 作成

- 作業内容に基づいてIssueのタイトル・本文を提案
- ユーザーの確認後、`gh issue create` でIssue作成
- `issues/` に対応するissueファイルを作成（`issue{番号}-xxx.md`）
- `issues/closed-issues.md` のテーブル末尾にIssue追加
- `issues/backlog.md` の該当項目があれば削除

参照: `issues/README.md`

## Step 3: 仕様書の更新確認

変更内容に応じて更新が必要かチェック:
- `docs/` 配下の関連ドキュメント
- 関連ディレクトリのREADME

必要なら更新、不要ならスキップ。

## Step 4: 作業ログ作成

- 日付は `date +%Y-%m-%d` コマンドで取得（手動入力禁止）
- `dev-logs/YYYY-MM-DD_task-description.md` を作成
- ログファイル構造に従う：
  - タスク名、作業日、GitHub Issue番号
  - 概要、実施内容、変更ファイル一覧、次のアクション
- `DEVELOPMENT_LOG.md` のログ一覧に追加（一番上に）

参照: `docs/claude-code-guidelines.md`

## Step 5: レビュー実施

- `reviews/README.md` のレビュー観点に従ってレビューを実施
  - 保守性・品質
  - エラーケース
  - 潜在的問題
  - 影響箇所
- `reviews/issue{番号}-review.md` にレビュー記録を作成
- レビュー結果をユーザーに報告

## Step 6: レビュー指摘対応

| 重要度 | 対応方法 |
|--------|----------|
| 致命的 | その場で修正（修正必須） |
| 重要 | その場で修正 |
| 軽微 | その場で修正、またはユーザー判断で棄却 |

**基本方針**: 即修正 or 棄却。backlog追記はしない。

## Step 7: 完了報告

- GitHub Issue（番号・URL）
- 作成ファイル一覧
- レビュー指摘サマリーと対応結果
- コミット可否の判断をユーザーに確認
- ユーザーがコミットを指示したら、CLAUDE.mdの「Gitステージング検証必須」に従ってコミットを実行

## 注意

- 日付は必ず `date +%Y-%m-%d` で取得する
- コミットメッセージは `{type}: {description} Closes #{番号}` 形式
- `Co-Authored-By` は付けない
