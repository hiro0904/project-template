# Tools

プログラムで使用するツールを管理するディレクトリ。

## ディレクトリ構成

```
tools/
├── README.md          # 本ファイル（運用ルール）
├── pptx/              # スライド自動生成ツール（pptxgenjs）
│   ├── package.json
│   ├── templates/     # スライドテンプレート
│   ├── scripts/       # 発表ごとの生成スクリプト
│   └── output/        # 生成ファイル出力先
├── tool-a/            # ツールごとにフォルダを分ける
│   ├── .venv/         # ツール固有の仮想環境
│   └── ...
└── tool-b/
    ├── .venv/
    └── ...
```

## pptx — スライド自動生成

PowerPoint スライドを pptxgenjs で自動生成するツール。
`/gen-slide` スキルと連携して、原稿からスライドを一括生成する。

**セットアップ**: `cd tools/pptx && npm install`
**詳細**: `docs/presentation-system.md` を参照

## 仮想環境の管理方針

- ツールごとに環境が異なる場合は、**ツールごとにフォルダを分け、その中で仮想環境を作成**する
- 複数ツールで環境を共有できる場合は、`tools/` 直下に共通の仮想環境を作成してもよい
- 仮想環境（`.venv/` など）は `.gitignore` で管理対象外とする
