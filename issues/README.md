# Issues 管理

**最終更新**: 2026-03-14

ローカルでのIssue管理用ディレクトリ。GitHub Issueと連携して使用。

## ファイル構成

```
issues/
├── README.md            # 本ファイル（運用ルール）
├── backlog.md           # 未整理Todo一覧（未対応タスクのみ）
├── closed-issues.md     # 完了Issue一覧（完了履歴の管理）
├── draft-xxx.md         # 下書きIssue（検討中）
└── issue{番号}-xxx.md   # GitHub Issue作成済み（番号付き）
```

## 運用フロー

```
1. backlog.md から作業を選択
     ↓
2. draft-xxx.md に切り出し
     ↓
3. 調査・仕様検討 → ドラフトに反映
     ↓
4. 作業の許可を得る
     ↓
5. GitHub Issue 作成 → ローカルファイルを番号付きにリネーム
     ↓
6. masterで直接作業・実装
     ↓
7. 作業完了 → 作業ログ作成（dev-logs/）
     ↓
8. Claude Codeにレビュー依頼 → レビュー記録作成（reviews/）
     ↓
9. レビュー指摘対応（全指摘を解決してからコミット）
   - その場で修正 / backlog追記 / 人間が棄却判断
     ↓
10. コミット（Closes #番号）→ push（Issueは自動クローズ）
```

## backlog.md 運用ルール

### 基本原則
- **backlog.md には未対応タスクのみ記載する**
- 完了したタスクはbacklogから削除し、`closed-issues.md` に記録する
- 「実装完了」等の履歴記述をbacklog.md に残さない

### 作業完了時の更新手順
1. backlog.md から該当タスクを削除
2. closed-issues.md のテーブルにIssue情報を追加
3. backlog.md に「実装完了」等のメモを残さないこと

### backlog追記ルール
- レビュー指摘等でbacklogに追記する場合は、適切なカテゴリに配置する
- レビュー記録へのリンクを付ける（例: `[#1レビュー](../reviews/issue1-review.md)指摘`）

## Git運用（シンプル版）

```
リモート（GitHub）
└── origin/master        ← 本番相当

ローカル（PC）
└── master               ← origin/master を追跡、直接作業
```

### コミット〜pushの流れ

```bash
# 1. 変更をステージング
git add .

# 2. ステージング確認（必須）
git status

# 3. Issue番号付きでコミット
git commit -m "feat: xxx Closes #1"

# 4. リモートにpush（人間が実行）
git push
```

### コミットメッセージ規約

```
<type>: <description> Closes #<issue番号>

例:
feat: ログイン機能追加 Closes #1
fix: 予約表示のバグ修正 Closes #2
refactor: APIリファクタリング Closes #3
```

**補足**: `Closes #番号` をコミットメッセージに含めると、pushした時にGitHub Issueが自動で閉じられる。

**type一覧**:
- `feat`: 新機能
- `fix`: バグ修正
- `refactor`: リファクタリング
- `docs`: ドキュメント
- `test`: テスト

## レビュー運用

作業完了時にClaude Codeにレビューを依頼する。
詳細は `/reviews/README.md` を参照。

## 注意事項

- **draft-xxx.md は任意**: Issueを詰めた時点で実装に入れるなら、draftは省略可
- **Issue作成 = 作業開始**: 個人開発では、仕様を詰めたらそのまま実装が効率的
- **並行作業OK**: featureブランチを使わないので、複数スレッドでの並行作業が可能
