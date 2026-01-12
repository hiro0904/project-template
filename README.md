# プロジェクト名

**最終更新**: YYYY-MM-DD

## テンプレートの使い方

> **注意**: このセクションは初期化完了後に削除してください

### 1. プロジェクトフォルダにコピー
```bash
cp -r project-template /path/to/new-project
cd /path/to/new-project
```

### 2. Git初期化
```bash
rm -rf .git  # テンプレートのgit履歴を削除
git init
```

### 3. Claude Code設定
```bash
mkdir -p .claude
cat > .claude/settings.local.json << 'EOF'
{
  "permissions": {
    "allow": [
      "Bash(mv:*)",
      "Bash(cp:*)",
      "Bash(mkdir:*)",
      "Bash(git log:*)",
      "Bash(git diff:*)"
    ],
    "deny": []
  }
}
EOF
```

### 4. プロジェクト固有の設定
- このセクション（テンプレートの使い方）を削除
- `README.md`のプロジェクト名・概要を更新
- `CLAUDE.md`のプロジェクト固有セクションを編集
- `.gitignore`に必要な除外パターンを追加

---

## 概要

<!-- プロジェクトの概要を記載 -->

## 技術スタック

<!-- 使用する技術を記載 -->
<!-- 例: Next.js, Express, MySQL など -->

## ディレクトリ構成

```
project-name/
├── README.md           # 本ファイル（プロジェクト概要）
├── CLAUDE.md           # Claude Code設定
├── DEVELOPMENT_LOG.md  # 開発ログインデックス
├── .claude/            # Claude Code権限設定
├── issues/             # Issue管理
├── reviews/            # レビュー記録
├── dev-logs/           # 開発ログ
├── api-docs/           # APIドキュメント（使用する場合）
├── db/                 # データベース関連（使用する場合）
├── report/             # レポート出力
└── project/            # 大規模タスク管理（必要に応じて）
```

## 開発を始める

1. `CLAUDE.md` を読んで開発フローを確認
2. `issues/backlog.md` からタスクを選択
3. 開発フローに従って作業

## 重要ファイル位置

<!-- プロジェクト固有の重要ファイルを追記 -->

| ファイル | 説明 |
|----------|------|
| CLAUDE.md | 開発ルール・フロー |
| issues/backlog.md | Todo一覧 |
