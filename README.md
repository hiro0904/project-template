# プロジェクト名

**最終更新**: 2026-03-14

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

### 3. プロジェクト固有の設定
- このセクション（テンプレートの使い方）を削除
- `README.md`のプロジェクト名・概要を更新
- `CLAUDE.md`のプロジェクト固有セクションを編集
- `.gitignore`に必要な除外パターンを追加
- `.claude/settings.local.json` にプロジェクト固有の許可コマンドを追加

### 4. グローバル設定（PC全体に適用）

以下はプロジェクト単位ではなく、PC全体のClaude Codeに適用する設定。
`~/.claude/settings.json` に追記する。

#### .envファイルアクセスブロック（フック）

`~/.claude/hooks/block-env.sh` を作成:

```bash
#!/bin/bash
# .env ファイルへのアクセスをブロックする PreToolUse フック
# .env.example / .env.sample は許可する

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')

# --- Read / Edit / Write: file_path をチェック ---
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')
if [ -n "$FILE_PATH" ]; then
  BASENAME=$(basename "$FILE_PATH")
  if [[ "$BASENAME" == .env || "$BASENAME" == .env.* ]]; then
    if [[ "$BASENAME" == *.example || "$BASENAME" == *.sample ]]; then
      exit 0
    fi
    echo "BLOCKED: .env ファイルへのアクセスは禁止されています ($BASENAME)" >&2
    exit 2
  fi
fi

# --- Grep: path をチェック ---
if [ "$TOOL_NAME" = "Grep" ]; then
  GREP_PATH=$(echo "$INPUT" | jq -r '.tool_input.path // empty')
  if [ -n "$GREP_PATH" ]; then
    BASENAME=$(basename "$GREP_PATH")
    if [[ "$BASENAME" == .env || "$BASENAME" == .env.* ]]; then
      if [[ "$BASENAME" == *.example || "$BASENAME" == *.sample ]]; then
        exit 0
      fi
      echo "BLOCKED: .env ファイルへの Grep は禁止されています ($BASENAME)" >&2
      exit 2
    fi
  fi
fi

# --- Bash: コマンド内の .env ファイル参照をチェック ---
if [ "$TOOL_NAME" = "Bash" ]; then
  COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')
  if [ -n "$COMMAND" ]; then
    if echo "$COMMAND" | grep -qP '\.env(?!\.example|\.sample)\b'; then
      echo "BLOCKED: .env ファイルを参照する Bash コマンドは禁止されています" >&2
      exit 2
    fi
  fi
fi

exit 0
```

```bash
chmod +x ~/.claude/hooks/block-env.sh
```

#### コンテキスト使用率ステータスライン

`~/.claude/statusline.sh` を作成:

```bash
#!/bin/bash
input=$(cat)

CONTEXT_SIZE=$(echo "$input" | jq -r '.context_window.context_window_size')
USAGE=$(echo "$input" | jq '.context_window.current_usage')

if [ "$USAGE" != "null" ] && [ "$CONTEXT_SIZE" != "null" ] && [ "$CONTEXT_SIZE" != "0" ]; then
    CURRENT=$(echo "$USAGE" | jq '.input_tokens + .cache_creation_input_tokens + .cache_read_input_tokens')
    ACTUAL_PERCENT=$((CURRENT * 100 / CONTEXT_SIZE))
    SCALED_PERCENT=$((ACTUAL_PERCENT * 100 / 85))
    if [ "$SCALED_PERCENT" -gt 100 ]; then
        SCALED_PERCENT=100
    fi

    WARNING=""
    if [ "$SCALED_PERCENT" -ge 80 ]; then
        WARNING=" ⚠️"
    fi
    if [ "$SCALED_PERCENT" -ge 95 ]; then
        WARNING=" 🚨"
    fi

    echo "Context: ${SCALED_PERCENT}%${WARNING}"
else
    echo "Context: -"
fi
```

```bash
chmod +x ~/.claude/statusline.sh
```

#### ~/.claude/settings.json に追記する内容

```jsonc
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Read|Edit|Write|Grep|Bash",
        "hooks": [
          {
            "type": "command",
            "command": "~/.claude/hooks/block-env.sh"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "powershell.exe -Command \"(New-Object Media.SoundPlayer 'C:\\Windows\\Media\\chimes.wav').PlaySync()\""
          }
        ]
      }
    ],
    "PermissionRequest": [
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "powershell.exe -Command \"(New-Object Media.SoundPlayer 'C:\\Windows\\Media\\chimes.wav').PlaySync()\""
          }
        ]
      }
    ]
  },
  "statusLine": {
    "type": "command",
    "command": "~/.claude/statusline.sh"
  }
}
```

> **注意**: 音の通知コマンドはWSL2 + Windows環境用。macOS等では別のコマンドに置き換えること。

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
├── .claude/            # Claude Code権限設定・コマンド
│   ├── settings.local.json
│   └── commands/       # スラッシュコマンド
│       ├── understand.md     # プロジェクト理解（/understand）
│       ├── wrapup.md         # 作業完了一括処理（/wrapup）
│       ├── review.md         # コードレビュー（/review）
│       ├── create-devlog.md  # 作業ログ作成（/create-devlog）
│       ├── create-issue.md   # Issue作成（/create-issue）
│       └── update-docs.md    # ドキュメント更新（/update-docs）
├── docs/               # 設計書・仕様書
│   ├── claude-code-guidelines.md  # Claude Code補助ガイドライン
│   └── archive/        # アーカイブ（完了・廃止ドキュメント）
├── issues/             # Issue管理
├── reviews/            # レビュー記録
├── dev-logs/           # 開発ログ
├── db/                 # データベース関連（使用する場合）
└── tools/              # プログラムツール（仮想環境管理）
```

## 開発を始める

1. `CLAUDE.md` を読んで開発フローを確認
2. `issues/backlog.md` からタスクを選択
3. `/understand` コマンドでプロジェクト理解を深める
4. 開発フローに従って作業
5. `/wrapup` コマンドで作業完了処理

## 重要ファイル位置

<!-- プロジェクト固有の重要ファイルを追記 -->

| ファイル | 説明 |
|----------|------|
| CLAUDE.md | 開発ルール・フロー |
| issues/backlog.md | Todo一覧 |
| docs/claude-code-guidelines.md | 開発フロー・ログ・指示対応の詳細 |
