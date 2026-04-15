GitHub Issueとローカルissueファイルを作成します。
引数 `$ARGUMENTS` にIssueタイトルを指定。

## 手順

1. **作業内容の把握**: 直前の会話から概要・対応方針を整理
2. **GitHub Issue作成**: `gh issue create` でIssue作成、番号を取得
3. **ローカルissueファイル作成**: `issues/issue{番号}-{kebab-case}.md`
4. **closed-issues.md 更新**: `issues/closed-issues.md` のテーブル末尾にIssue追加
5. **backlog.md 更新**: 該当タスクがあれば削除
6. **完了報告**: Issue番号・URL・作成ファイルを報告

参照: `issues/README.md`

## 注意

- 日付は必ず `date +%Y-%m-%d` で取得する
