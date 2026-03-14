---
name: wrap-up
description: 作業完了後の一連処理（GitHub Issue作成 → issueファイル → backlog更新 → 作業ログ → レビュー）を一括実行する
argument-hint: <タイトル>
disable-model-invocation: true
---

# 作業完了一括処理

引数 `$ARGUMENTS`（Issueタイトル）。

**このスキルは以下の全ステップを必ず実行すること。ステップを飛ばさない。**

## 処理フロー（全ステップ必須）

### Step 1: 作業内容の把握

```bash
date +%Y-%m-%d
git diff --name-only HEAD
git log --oneline -3
git status
```

変更ファイル一覧・作業概要を整理する。

### Step 2: GitHub Issue作成 + ローカルissueファイル

`create-issue` スキルと同等の処理を行う:
- `gh issue create` でGitHub Issue作成、番号を取得
- `issues/issue{番号}-{kebab-case}.md` を作成
- `issues/closed-issues.md` のテーブル末尾にIssue追加
- `issues/backlog.md` の該当タスクを削除

参照: `issues/README.md`

### Step 3: 仕様書の更新確認

変更内容に応じて更新が必要かチェック:
- `docs/` 配下の関連仕様書・設計書
- 関連ディレクトリのREADME

必要なら更新、不要ならスキップ。

### Step 4: 作業ログ作成

`create-devlog` スキルと同等の処理を行う:
- `dev-logs/{日付}_{短縮名}.md` を作成
- `DEVELOPMENT_LOG.md` のログ一覧の一番上にエントリ追加、最終更新日も更新

参照: `docs/claude-code-guidelines.md`（テンプレート）

### Step 5: コードレビュー

`review` スキルと同等の処理を行う:
- 変更ファイルを全て読んでレビュー
- `reviews/issue{番号}-review.md` を作成

参照: `reviews/README.md`（レビュー観点・テンプレート）

### Step 6: レビュー指摘対応

レビューで見つかった指摘を**すべて**以下のいずれかで対応する。未対応の指摘を残したままコミットしない。

| 重要度 | 対応方法 |
|--------|----------|
| 致命的 | その場で修正（修正必須） |
| 重要 | その場で修正、または `issues/backlog.md` に追記して次回対応 |
| 軽微 | `issues/backlog.md` に追記（対応任意） |

- backlog追記する場合はレビュー記録へのリンクを付ける（例: `[#1レビュー](../reviews/issue1-review.md)指摘`）
- **backlog追記時は `issues/README.md` のルールに従う**
- ユーザーが棄却判断した指摘は、レビュー記録の対応状況欄に「棄却（理由）」と記載

### Step 7: 完了報告

以下をまとめて報告する:
- GitHub Issue（番号・URL）
- 作成ファイル一覧
- レビュー指摘サマリーと対応結果（修正済み / backlog追記 / 棄却）
- コミット可能かどうか

## 注意

- 日付は必ず `date +%Y-%m-%d` で取得する
- コミットメッセージは `{type}: {description} Closes #{番号}` 形式
- `Co-Authored-By` は付けない
