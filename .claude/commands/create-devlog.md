作業ログを作成し、DEVELOPMENT_LOG.mdインデックスを更新します。
引数 `$ARGUMENTS` でIssue番号指定（省略時は直前の作業から推測）。

## 手順

1. **作業内容の把握**: `git diff --name-only HEAD`, `git log --oneline -3` で変更内容を確認
2. **作業ログファイル作成**: `dev-logs/{日付}_{短縮名}.md`
3. **DEVELOPMENT_LOG.md 更新**: ログ一覧の一番上にエントリ追加、最終更新日も更新
4. **完了報告**: 作成ファイルパスを報告

参照: `docs/claude-code-guidelines.md`

## 注意

- 日付は必ず `date +%Y-%m-%d` で取得する
- 変更ファイル一覧は必須（省略しない）
- 機密情報は絶対に含めない
