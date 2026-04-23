const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "汎用プレゼンテーション テンプレート";

// ── カラーパレット ──────────────────────────────────────
// プロジェクトに合わせてカスタマイズしてください
const C = {
  blueBell:      "3E92CC",  // ライトブルー（アクセント）
  balticBlue:    "2A628F",  // ミディアムブルー
  deepSpace:     "13293D",  // 最暗（タイトル背景など）
  deepSpace2:    "16324F",  // ダーク
  yaleBlue:      "18435A",  // ミドルダーク
  white:         "FFFFFF",
  offWhite:      "F4F7FA",
  lightGray:     "E8EEF4",
  mutedText:     "8AAEC8",
};

const F = { title: "游ゴシック", body: "游ゴシック" };

// ── 共通ヘッダーヘルパー ──────────────────────────────────────
function addContentHeader(s, pres, title, pageNum) {
  // 左縦アクセント
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.08, h: 5.625,
    fill: { color: C.deepSpace }, line: { color: C.deepSpace, width: 0 },
  });
  // タイトル
  s.addText(title, {
    x: 0.35, y: 0.35, w: 8.5, h: 0.55,
    fontFace: F.title, fontSize: 24, bold: true,
    color: C.deepSpace, align: "left", valign: "middle", margin: 0,
  });
  // グレー全幅ライン
  s.addShape(pres.shapes.LINE, {
    x: 0.35, y: 0.97, w: 9.3, h: 0,
    line: { color: C.lightGray, width: 0.7 },
  });
  // ブルーアクセント（太く・短く）
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.35, y: 0.91, w: 0.65, h: 0.075,
    fill: { color: C.blueBell }, line: { color: C.blueBell, width: 0 },
  });
  // キーメッセージ
  s.addText("キーメッセージ：このスライドで一番伝えたいことを1行で書きます。", {
    x: 0.35, y: 1.2, w: 9.3, h: 0.5,
    fontFace: F.body, fontSize: 13, bold: true,
    color: C.deepSpace, align: "left", valign: "middle", margin: 0,
  });
  // ページ番号
  s.addText(String(pageNum), {
    x: 9.3, y: 5.2, w: 0.4, h: 0.25,
    fontFace: F.body, fontSize: 9, color: C.mutedText, align: "center", margin: 0,
  });
}

// ══════════════════════════════════════════════════════════════
// SLIDE 1 — タイトルスライド（左縦バー＋大タイトル）
// ══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.deepSpace };

  // 左の細い縦アクセントバー
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.15, h: 5.625,
    fill: { color: C.blueBell }, line: { color: C.blueBell, width: 0 },
  });

  // 右側のデコレーション（薄い大きいブロック）
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.8, y: 0, w: 2.2, h: 5.625,
    fill: { color: C.deepSpace2 }, line: { color: C.deepSpace2, width: 0 },
  });
  // 右側の細い縦バー
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.68, y: 0, w: 0.12, h: 5.625,
    fill: { color: C.balticBlue }, line: { color: C.balticBlue, width: 0 },
  });

  // メインタイトル
  s.addText("プレゼンテーション\nタイトル", {
    x: 0.45, y: 1.2, w: 7.0, h: 2.2,
    fontFace: F.title, fontSize: 46, bold: true,
    color: C.white, align: "left", valign: "middle", margin: 0,
  });

  // サブタイトル（ブルーベルのライン）
  s.addShape(pres.shapes.LINE, {
    x: 0.45, y: 3.55, w: 3.5, h: 0,
    line: { color: C.blueBell, width: 1 },
  });

  s.addText("サブタイトル・説明文をここに入力します", {
    x: 0.45, y: 3.7, w: 7.0, h: 0.45,
    fontFace: F.body, fontSize: 14,
    color: C.mutedText, align: "left", margin: 0,
  });

  // 日付・担当者
  s.addText("2024年●月　　担当者名", {
    x: 0.45, y: 5.1, w: 5, h: 0.3,
    fontFace: F.body, fontSize: 10, color: C.balticBlue, align: "left", margin: 0,
  });
}

// ══════════════════════════════════════════════════════════════
// SLIDE 2 — 目次（左パネル＋右リスト）
// ══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.offWhite };

  // 左パネル（deepSpace）
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 3.3, h: 5.625,
    fill: { color: C.deepSpace }, line: { color: C.deepSpace, width: 0 },
  });
  // 左パネルの細いブルーラインアクセント
  s.addShape(pres.shapes.RECTANGLE, {
    x: 3.3, y: 0, w: 0.04, h: 5.625,
    fill: { color: C.blueBell }, line: { color: C.blueBell, width: 0 },
  });

  // 左パネルのラベル（縦中央配置）
  s.addText("CONTENTS", {
    x: 0.35, y: 2.1, w: 2.6, h: 0.35,
    fontFace: F.body, fontSize: 10, color: C.blueBell,
    align: "left", charSpacing: 5, margin: 0,
  });
  s.addText("目次", {
    x: 0.35, y: 2.5, w: 2.6, h: 0.8,
    fontFace: F.title, fontSize: 36, bold: true,
    color: C.white, align: "left", margin: 0,
  });

  // 目次アイテム
  const items = [
    ["01", "はじめに"],
    ["02", "現状分析"],
    ["03", "課題と提案"],
    ["04", "実施計画"],
    ["05", "まとめ"],
  ];

  const slideH   = 5.625;
  const rowH     = slideH / items.length;
  const panelX   = 3.34;
  const panelW   = 10 - panelX;
  const numW     = 0.58;
  const barGap   = 0.12;
  const barW     = 0.05;
  const barH     = 0.22;
  const sepX     = panelX + numW + barGap;
  const labelX   = sepX + barW + barGap;
  const labelW   = panelX + panelW - labelX - 0.25;
  const itemColor = C.deepSpace;

  items.forEach(([num, label], i) => {
    const rowY = i * rowH;

    const numOffset = 0.07;
    s.addText(num, {
      x: panelX + 0.2, y: rowY + numOffset, w: numW, h: rowH - numOffset,
      fontFace: F.title, fontSize: 26, bold: true,
      color: itemColor, align: "left", valign: "middle", margin: 0,
    });

    s.addShape(pres.shapes.RECTANGLE, {
      x: sepX, y: rowY + (rowH - barH) / 2, w: barW, h: barH,
      fill: { color: itemColor }, line: { color: itemColor, width: 0 },
    });

    s.addText(label, {
      x: labelX, y: rowY, w: labelW, h: rowH,
      fontFace: F.body, fontSize: 16, color: itemColor,
      align: "left", valign: "middle", margin: 0,
    });

    if (i < items.length - 1) {
      s.addShape(pres.shapes.LINE, {
        x: panelX, y: rowY + rowH, w: panelW, h: 0,
        line: { color: C.lightGray, width: 0.5 },
      });
    }
  });

  // ページ番号
  s.addText("2", {
    x: 9.3, y: 5.2, w: 0.4, h: 0.25,
    fontFace: F.body, fontSize: 9, color: C.mutedText, align: "center", margin: 0,
  });
}

// ══════════════════════════════════════════════════════════════
// SLIDE 3 — セクション区切り（大番号が背景に）
// ══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.deepSpace };

  // 右側ダークパネル
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.5, y: 0, w: 2.5, h: 5.625,
    fill: { color: C.deepSpace2 }, line: { color: C.deepSpace2, width: 0 },
  });
  // 右縦ライン
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.38, y: 0, w: 0.12, h: 5.625,
    fill: { color: C.blueBell }, line: { color: C.blueBell, width: 0 },
  });

  // 大きな薄い背景数字
  s.addText("01", {
    x: 0.1, y: -0.3, w: 5, h: 3.5,
    fontFace: F.title, fontSize: 200, bold: true,
    color: C.deepSpace2, align: "left", margin: 0,
  });

  // セクションラベル
  s.addText("SECTION", {
    x: 0.5, y: 2.5, w: 5, h: 0.35,
    fontFace: F.body, fontSize: 10, color: C.blueBell,
    charSpacing: 6, align: "left", margin: 0,
  });

  // セクションタイトル
  s.addText("セクションタイトルを\nここに入力", {
    x: 0.5, y: 2.9, w: 6.6, h: 1.8,
    fontFace: F.title, fontSize: 36, bold: true,
    color: C.white, align: "left", margin: 0,
  });

  // ページ番号
  s.addText("3", {
    x: 9.3, y: 5.2, w: 0.4, h: 0.25,
    fontFace: F.body, fontSize: 9, color: C.balticBlue, align: "center", margin: 0,
  });
}

// ══════════════════════════════════════════════════════════════
// SLIDE 4 — コンテンツ（テキスト）
// ══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.offWhite };
  addContentHeader(s, pres, "スライドタイトル", 4);

  // 本文エリア
  s.addText([
    { text: "本文の見出し1", options: { bold: true, breakLine: true, fontSize: 14, color: C.deepSpace } },
    { text: "ここに説明文や詳細情報を記述します。必要に応じて複数の段落に分けて整理してください。", options: { breakLine: true, fontSize: 12, color: C.yaleBlue } },
    { text: " ", options: { breakLine: true, fontSize: 12 } },
    { text: "本文の見出し2", options: { bold: true, breakLine: true, fontSize: 14, color: C.deepSpace } },
    { text: "データや根拠を示しながら、ロジカルに説明を展開していきます。", options: { fontSize: 12, color: C.yaleBlue } },
  ], {
    x: 0.35, y: 1.88, w: 9.3, h: 3.4,
    fontFace: F.body, valign: "top", margin: [0.05, 0, 0, 0],
  });
}

// ══════════════════════════════════════════════════════════════
// SLIDE 5 — メッセージ強調（大テキスト中央配置）
// ══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.offWhite };
  addContentHeader(s, pres, "メッセージ強調", 5);

  // 大きなメッセージテキスト（中央配置）
  s.addText("伝えたいメッセージを\nここに入力", {
    x: 0.35, y: 1.88, w: 9.3, h: 3.4,
    fontFace: F.title, fontSize: 36, bold: true,
    color: C.deepSpace, align: "center", valign: "middle", margin: 0,
  });
}

// ══════════════════════════════════════════════════════════════
// SLIDE 6 — 自己紹介（アイコン＋プロフィール）
// ══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.offWhite };
  addContentHeader(s, pres, "自己紹介", 6);

  // 左：アイコン画像プレースホルダー（正方形）
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.55, y: 2.1, w: 1.8, h: 1.8,
    fill: { color: C.deepSpace2 }, line: { color: C.deepSpace2, width: 0 },
    shadow: { type: "outer", blur: 8, offset: 2, angle: 135, color: "000000", opacity: 0.1 },
  });
  s.addText("アイコン", {
    x: 0.55, y: 2.1, w: 1.8, h: 1.8,
    fontFace: F.body, fontSize: 11, color: C.mutedText,
    align: "center", valign: "middle", margin: 0,
  });

  // アイコン下：名前
  s.addText("名前・所属", {
    x: 0.35, y: 4.05, w: 2.2, h: 0.4,
    fontFace: F.title, fontSize: 12, bold: true,
    color: C.deepSpace, align: "center", valign: "middle", margin: 0,
  });

  // 右：プロフィール情報（テキスト）
  s.addText([
    { text: "プロフィール概要", options: { bold: true, breakLine: true, fontSize: 14, color: C.deepSpace } },
    { text: "自己紹介の説明文を記述します。経歴や活動内容など。", options: { breakLine: true, fontSize: 12, color: C.yaleBlue } },
    { text: " ", options: { breakLine: true, fontSize: 12 } },
  ], {
    x: 3.0, y: 2.0, w: 4.0, h: 2.0,
    fontFace: F.body, valign: "top", margin: [0.05, 0, 0, 0],
  });

  // 右：プロフィール表
  const profileData = [
    [
      { text: "所属", options: { fontSize: 11, bold: true, color: C.deepSpace, fill: { color: C.lightGray }, align: "left", valign: "middle", margin: [0.05, 0.1, 0.05, 0.1] } },
      { text: "所属名を入力", options: { fontSize: 11, color: C.yaleBlue, fill: { color: C.white }, align: "left", valign: "middle", margin: [0.05, 0.1, 0.05, 0.1] } },
    ],
    [
      { text: "担当", options: { fontSize: 11, bold: true, color: C.deepSpace, fill: { color: C.lightGray }, align: "left", valign: "middle", margin: [0.05, 0.1, 0.05, 0.1] } },
      { text: "担当領域を入力", options: { fontSize: 11, color: C.yaleBlue, fill: { color: C.white }, align: "left", valign: "middle", margin: [0.05, 0.1, 0.05, 0.1] } },
    ],
  ];

  s.addTable(profileData, {
    x: 3.0, y: 4.0, w: 6.6,
    colW: [1.8, 4.8],
    border: { pt: 0.5, color: C.lightGray },
    rowH: 0.55,
  });
}

// ══════════════════════════════════════════════════════════════
// SLIDE 7 — 2ポイントカード
// ══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.offWhite };
  addContentHeader(s, pres, "2つのポイント", 7);

  // 2カード（中央寄せ配置）
  const cards = [
    { num: "01", title: "ポイント1のタイトル", body: "ここに説明文を入力します。簡潔に要点をまとめてください。" },
    { num: "02", title: "ポイント2のタイトル", body: "ここに説明文を入力します。簡潔に要点をまとめてください。" },
  ];

  const cardW = 4.4;
  const gap = 0.35;
  const totalW = cardW * 2 + gap;
  const startX = (10 - totalW) / 2;

  cards.forEach((card, i) => {
    const x = startX + i * (cardW + gap);
    // カード背景（白）
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 2.05, w: cardW, h: 3.2,
      fill: { color: C.white }, line: { color: C.lightGray, width: 0.5 },
      shadow: { type: "outer", blur: 10, offset: 3, angle: 135, color: "000000", opacity: 0.07 },
    });
    // カード上部のdeepSpaceバー
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 2.05, w: cardW, h: 0.07,
      fill: { color: C.deepSpace }, line: { color: C.deepSpace, width: 0 },
    });
    // 番号
    s.addText(card.num, {
      x: x + 0.25, y: 2.2, w: 1.2, h: 0.7,
      fontFace: F.title, fontSize: 32, bold: true,
      color: C.blueBell, align: "left", margin: 0,
    });
    // タイトル
    s.addText(card.title, {
      x: x + 0.25, y: 2.95, w: cardW - 0.5, h: 0.45,
      fontFace: F.title, fontSize: 14, bold: true,
      color: C.deepSpace, align: "left", margin: 0,
    });
    // 区切りライン
    s.addShape(pres.shapes.LINE, {
      x: x + 0.25, y: 3.44, w: cardW - 0.5, h: 0,
      line: { color: C.lightGray, width: 0.5 },
    });
    // 本文
    s.addText(card.body, {
      x: x + 0.25, y: 3.55, w: cardW - 0.5, h: 1.55,
      fontFace: F.body, fontSize: 12, color: C.yaleBlue,
      align: "left", valign: "top", margin: 0,
    });
  });
}

// ══════════════════════════════════════════════════════════════
// SLIDE 8 — 3ポイントスライド（シンプルカード）
// ══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.offWhite };
  addContentHeader(s, pres, "3つのポイント", 8);

  // 3カード
  const cards = [
    { num: "01", title: "ポイント1のタイトル", body: "ここに説明文を入力します。簡潔に要点をまとめてください。" },
    { num: "02", title: "ポイント2のタイトル", body: "ここに説明文を入力します。簡潔に要点をまとめてください。" },
    { num: "03", title: "ポイント3のタイトル", body: "ここに説明文を入力します。簡潔に要点をまとめてください。" },
  ];

  cards.forEach((card, i) => {
    const x = 0.35 + i * 3.15;
    // カード背景（白）
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 2.05, w: 2.98, h: 3.2,
      fill: { color: C.white }, line: { color: C.lightGray, width: 0.5 },
      shadow: { type: "outer", blur: 10, offset: 3, angle: 135, color: "000000", opacity: 0.07 },
    });
    // カード上部のdeepSpaceバー
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 2.05, w: 2.98, h: 0.07,
      fill: { color: C.deepSpace }, line: { color: C.deepSpace, width: 0 },
    });
    // 番号
    s.addText(card.num, {
      x: x + 0.18, y: 2.2, w: 1.2, h: 0.7,
      fontFace: F.title, fontSize: 32, bold: true,
      color: C.blueBell, align: "left", margin: 0,
    });
    // タイトル
    s.addText(card.title, {
      x: x + 0.18, y: 2.95, w: 2.6, h: 0.45,
      fontFace: F.title, fontSize: 13, bold: true,
      color: C.deepSpace, align: "left", margin: 0,
    });
    // 区切りライン
    s.addShape(pres.shapes.LINE, {
      x: x + 0.18, y: 3.44, w: 2.58, h: 0,
      line: { color: C.lightGray, width: 0.5 },
    });
    // 本文
    s.addText(card.body, {
      x: x + 0.18, y: 3.55, w: 2.6, h: 1.55,
      fontFace: F.body, fontSize: 11, color: C.yaleBlue,
      align: "left", valign: "top", margin: 0,
    });
  });
}

// ══════════════════════════════════════════════════════════════
// SLIDE 9 — 2カラムスライド
// ══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.offWhite };
  addContentHeader(s, pres, "2カラムレイアウト", 9);

  // 左カラム（deepSpace背景）
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.35, y: 2.05, w: 4.4, h: 3.2,
    fill: { color: C.deepSpace }, line: { color: C.deepSpace, width: 0 },
  });
  s.addText("左カラム\nタイトル", {
    x: 0.55, y: 2.25, w: 4.0, h: 0.9,
    fontFace: F.title, fontSize: 20, bold: true,
    color: C.white, align: "left", margin: 0,
  });
  s.addShape(pres.shapes.LINE, {
    x: 0.55, y: 3.2, w: 3.8, h: 0,
    line: { color: C.balticBlue, width: 0.7 },
  });
  s.addText("ここに説明文や分析内容を入力します。左側には主張や背景情報などを記述するのに適しています。", {
    x: 0.55, y: 3.3, w: 3.9, h: 1.8,
    fontFace: F.body, fontSize: 12, color: C.mutedText,
    align: "left", valign: "top", margin: 0,
  });

  // 右カラム（白背景）
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.0, y: 2.05, w: 4.65, h: 3.2,
    fill: { color: C.white }, line: { color: C.lightGray, width: 0.5 },
    shadow: { type: "outer", blur: 10, offset: 3, angle: 135, color: "000000", opacity: 0.07 },
  });
  s.addText("右カラム\nタイトル", {
    x: 5.2, y: 2.25, w: 4.2, h: 0.9,
    fontFace: F.title, fontSize: 20, bold: true,
    color: C.deepSpace, align: "left", margin: 0,
  });
  s.addShape(pres.shapes.LINE, {
    x: 5.2, y: 3.2, w: 4.1, h: 0,
    line: { color: C.lightGray, width: 0.7 },
  });
  s.addText("ここに説明文や提案内容を入力します。右側には結論や具体的なアクションを記述するのに適しています。", {
    x: 5.2, y: 3.3, w: 4.2, h: 1.8,
    fontFace: F.body, fontSize: 12, color: C.yaleBlue,
    align: "left", valign: "top", margin: 0,
  });
}

// ══════════════════════════════════════════════════════════════
// SLIDE 10 — 表スライド
// ══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.offWhite };
  addContentHeader(s, pres, "表タイトル", 10);

  // テーブルデータ
  const colW = [2.2, 1.8, 1.8, 1.8, 1.8];
  const headers = ["項目", "データA", "データB", "データC", "データD"];
  const rows = [
    ["内容1", "〇〇〇", "〇〇〇", "〇〇〇", "〇〇〇"],
    ["内容2", "〇〇〇", "〇〇〇", "〇〇〇", "〇〇〇"],
    ["内容3", "〇〇〇", "〇〇〇", "〇〇〇", "〇〇〇"],
    ["内容4", "〇〇〇", "〇〇〇", "〇〇〇", "〇〇〇"],
  ];

  // ヘッダー行
  const headerCells = headers.map((h, ci) => ({
    text: h,
    options: {
      bold: true,
      fontSize: 12,
      color: C.white,
      fill: { color: ci === 0 ? C.deepSpace : C.yaleBlue },
      align: "center",
      valign: "middle",
      margin: [0.08, 0.1, 0.08, 0.1],
    },
  }));

  // データ行
  const tableData = [headerCells];
  rows.forEach((row, ri) => {
    const bgEven = C.white;
    const bgOdd  = C.offWhite;
    tableData.push(
      row.map((cell, ci) => ({
        text: cell,
        options: {
          fontSize: 11,
          color: C.deepSpace,
          fill: { color: ci === 0 ? C.lightGray : (ri % 2 === 0 ? bgEven : bgOdd) },
          bold: ci === 0,
          align: ci === 0 ? "left" : "center",
          valign: "middle",
          margin: [0.07, 0.1, 0.07, 0.1],
        },
      }))
    );
  });

  s.addTable(tableData, {
    x: 0.35, y: 1.88, w: 9.4,
    colW,
    border: { pt: 0.5, color: C.lightGray },
    rowH: 0.48,
  });
}

// ══════════════════════════════════════════════════════════════
// SLIDE 11 — 画像＋テキスト（左画像・右説明）
// ══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.offWhite };
  addContentHeader(s, pres, "画像＋テキストレイアウト", 11);

  // 左：画像プレースホルダー
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.35, y: 1.88, w: 4.6, h: 3.45,
    fill: { color: C.deepSpace2 }, line: { color: C.deepSpace2, width: 0 },
    shadow: { type: "outer", blur: 8, offset: 2, angle: 135, color: "000000", opacity: 0.1 },
  });
  s.addText("画像をここに配置", {
    x: 0.35, y: 1.88, w: 4.6, h: 3.45,
    fontFace: F.body, fontSize: 13, color: C.mutedText,
    align: "center", valign: "middle", margin: 0,
  });
  s.addText("図1　キャプションをここに記入", {
    x: 0.35, y: 5.2, w: 4.6, h: 0.25,
    fontFace: F.body, fontSize: 9, color: C.mutedText,
    align: "center", margin: 0,
  });

  // 右：説明テキスト
  s.addText([
    { text: "見出し1", options: { bold: true, breakLine: true, fontSize: 14, color: C.deepSpace } },
    { text: "画像についての説明文を記述します。図の内容を補足し、読者の理解を助ける情報を記載してください。", options: { breakLine: true, fontSize: 12, color: C.yaleBlue } },
    { text: " ", options: { breakLine: true, fontSize: 12 } },
    { text: "見出し2", options: { bold: true, breakLine: true, fontSize: 14, color: C.deepSpace } },
    { text: "追加の説明や補足情報、注釈などをここに記述します。", options: { fontSize: 12, color: C.yaleBlue } },
  ], {
    x: 5.2, y: 1.88, w: 4.45, h: 3.45,
    fontFace: F.body, valign: "top", margin: [0.05, 0, 0, 0.1],
  });
}

// ══════════════════════════════════════════════════════════════
// SLIDE 12 — 画像＋テキスト（右画像・左説明）
// ══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.offWhite };
  addContentHeader(s, pres, "画像＋テキスト（右画像）", 12);

  // 左：説明テキスト
  s.addText([
    { text: "見出し1", options: { bold: true, breakLine: true, fontSize: 14, color: C.deepSpace } },
    { text: "画像についての説明文を記述します。図の内容を補足し、読者の理解を助ける情報を記載してください。", options: { breakLine: true, fontSize: 12, color: C.yaleBlue } },
    { text: " ", options: { breakLine: true, fontSize: 12 } },
    { text: "見出し2", options: { bold: true, breakLine: true, fontSize: 14, color: C.deepSpace } },
    { text: "追加の説明や補足情報、注釈などをここに記述します。", options: { fontSize: 12, color: C.yaleBlue } },
  ], {
    x: 0.35, y: 1.88, w: 4.45, h: 3.45,
    fontFace: F.body, valign: "top", margin: [0.05, 0.1, 0, 0],
  });

  // 右：画像プレースホルダー
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.05, y: 1.88, w: 4.6, h: 3.45,
    fill: { color: C.deepSpace2 }, line: { color: C.deepSpace2, width: 0 },
    shadow: { type: "outer", blur: 8, offset: 2, angle: 135, color: "000000", opacity: 0.1 },
  });
  s.addText("画像をここに配置", {
    x: 5.05, y: 1.88, w: 4.6, h: 3.45,
    fontFace: F.body, fontSize: 13, color: C.mutedText,
    align: "center", valign: "middle", margin: 0,
  });
  s.addText("図1　キャプションをここに記入", {
    x: 5.05, y: 5.2, w: 4.6, h: 0.25,
    fontFace: F.body, fontSize: 9, color: C.mutedText,
    align: "center", margin: 0,
  });
}

// ══════════════════════════════════════════════════════════════
// SLIDE 13 — 全面画像＋テキストオーバーレイ
// ══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.deepSpace };

  // 全面画像プレースホルダー
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 5.625,
    fill: { color: C.deepSpace2 }, line: { color: C.deepSpace2, width: 0 },
  });
  s.addText("画像をここに配置（背景全面）", {
    x: 0, y: 0, w: 10, h: 5.625,
    fontFace: F.body, fontSize: 14, color: C.balticBlue,
    align: "center", valign: "middle", margin: 0,
  });

  // 左縦アクセント
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.12, h: 5.625,
    fill: { color: C.blueBell }, line: { color: C.blueBell, width: 0 },
  });

  // 下部テキストオーバーレイ（半透明パネル）
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 3.8, w: 10, h: 1.825,
    fill: { color: C.deepSpace, transparency: 20 }, line: { color: C.deepSpace, width: 0 },
  });

  // オーバーレイ内テキスト
  s.addText("スライドタイトル・キャプション", {
    x: 0.45, y: 3.9, w: 8.5, h: 0.55,
    fontFace: F.title, fontSize: 22, bold: true,
    color: C.white, align: "left", valign: "middle", margin: 0,
  });
  s.addShape(pres.shapes.LINE, {
    x: 0.45, y: 4.5, w: 3.0, h: 0,
    line: { color: C.blueBell, width: 1 },
  });
  s.addText("画像の補足説明文やコンテキストをここに入力します。", {
    x: 0.45, y: 4.6, w: 8.5, h: 0.4,
    fontFace: F.body, fontSize: 12, color: C.mutedText,
    align: "left", margin: 0,
  });

  // ページ番号
  s.addText("13", {
    x: 9.3, y: 5.2, w: 0.4, h: 0.25,
    fontFace: F.body, fontSize: 9, color: C.balticBlue, align: "center", margin: 0,
  });
}

// ══════════════════════════════════════════════════════════════
// SLIDE 14 — エンディングスライド
// ══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.deepSpace };

  // 左縦アクセント
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.15, h: 5.625,
    fill: { color: C.blueBell }, line: { color: C.blueBell, width: 0 },
  });

  // 右ダークパネル
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.8, y: 0, w: 2.2, h: 5.625,
    fill: { color: C.deepSpace2 }, line: { color: C.deepSpace2, width: 0 },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.68, y: 0, w: 0.12, h: 5.625,
    fill: { color: C.balticBlue }, line: { color: C.balticBlue, width: 0 },
  });

  // 大きな薄い背景文字
  s.addText("Thank\nyou", {
    x: 0.2, y: -0.4, w: 7.2, h: 4.5,
    fontFace: F.title, fontSize: 130, bold: true, italic: true,
    color: C.deepSpace2, align: "left", margin: 0,
  });

  // フォアグラウンドテキスト
  s.addText("Thank you", {
    x: 0.45, y: 1.4, w: 7.0, h: 1.2,
    fontFace: F.title, fontSize: 56, bold: true, italic: true,
    color: C.white, align: "left", margin: 0,
  });

  // ライン
  s.addShape(pres.shapes.LINE, {
    x: 0.45, y: 2.75, w: 3.5, h: 0,
    line: { color: C.blueBell, width: 1 },
  });

  s.addText("ご清聴ありがとうございました", {
    x: 0.45, y: 2.9, w: 7.0, h: 0.5,
    fontFace: F.body, fontSize: 18, color: C.mutedText, align: "left", margin: 0,
  });
  s.addText("お問い合わせ：example@company.com", {
    x: 0.45, y: 5.1, w: 5, h: 0.3,
    fontFace: F.body, fontSize: 10, color: C.balticBlue, align: "left", margin: 0,
  });
}

// ══════════════════════════════════════════════════════════════
// SLIDE 15 — 大画像（タイトル下）
// ══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.offWhite };
  addContentHeader(s, pres, "大画像（タイトル下）", 15);

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.35, y: 1.78, w: 9.3, h: 3.6,
    fill: { color: C.deepSpace2 }, line: { color: C.deepSpace2, width: 0 },
    shadow: { type: "outer", blur: 8, offset: 2, angle: 135, color: "000000", opacity: 0.1 },
  });
  s.addText("画像をここに配置（最大表示）", {
    x: 0.35, y: 1.78, w: 9.3, h: 3.6,
    fontFace: F.body, fontSize: 14, color: C.mutedText,
    align: "center", valign: "middle", margin: 0,
  });
}

// ══════════════════════════════════════════════════════════════
// SLIDE 16 — 大画像（画像先行）
// ══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.offWhite };
  addContentHeader(s, pres, "大画像（画像先行）", 16);

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.35, y: 1.78, w: 9.3, h: 3.1,
    fill: { color: C.deepSpace2 }, line: { color: C.deepSpace2, width: 0 },
    shadow: { type: "outer", blur: 8, offset: 2, angle: 135, color: "000000", opacity: 0.1 },
  });
  s.addText("画像をここに配置（最大表示）", {
    x: 0.35, y: 1.78, w: 9.3, h: 3.1,
    fontFace: F.body, fontSize: 14, color: C.mutedText,
    align: "center", valign: "middle", margin: 0,
  });

  // 下部コメント
  s.addText("キャプション・補足コメントをここに入力", {
    x: 0.35, y: 5.0, w: 9.3, h: 0.45,
    fontFace: F.body, fontSize: 12, color: C.yaleBlue,
    align: "left", valign: "middle", margin: 0,
  });
}

// ══════════════════════════════════════════════════════════════
// SLIDE 17 — ポイント列挙（3項目の例）
// ══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.offWhite };
  addContentHeader(s, pres, "ポイント列挙（3項目）", 17);

  const items = [
    "ポイント1の内容",
    "ポイント2の内容",
    "ポイント3の内容",
  ];

  const startY = 1.88;
  const totalH = 3.5;
  const rowH = totalH / items.length;

  items.forEach((text, i) => {
    const y = startY + i * rowH;

    s.addText(`${i + 1}.`, {
      x: 0.5, y, w: 0.9, h: rowH,
      fontFace: F.title, fontSize: 36, bold: true,
      color: C.blueBell, align: "right", valign: "middle", margin: 0,
    });

    s.addText(text, {
      x: 1.6, y, w: 7.8, h: rowH,
      fontFace: F.title, fontSize: 24, bold: true,
      color: C.deepSpace, align: "left", valign: "middle", margin: 0,
    });

    if (i < items.length - 1) {
      s.addShape(pres.shapes.LINE, {
        x: 0.5, y: y + rowH, w: 9.0, h: 0,
        line: { color: C.lightGray, width: 0.5 },
      });
    }
  });
}

// ══════════════════════════════════════════════════════════════
// SLIDE 18 — ポイント列挙（2項目の例）
// ══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.offWhite };
  addContentHeader(s, pres, "ポイント列挙（2項目）", 18);

  const items = [
    "ポイント1の内容",
    "ポイント2の内容",
  ];

  const startY = 1.88;
  const totalH = 3.5;
  const rowH = totalH / items.length;

  items.forEach((text, i) => {
    const y = startY + i * rowH;

    s.addText(`${i + 1}.`, {
      x: 0.5, y, w: 0.9, h: rowH,
      fontFace: F.title, fontSize: 42, bold: true,
      color: C.blueBell, align: "right", valign: "middle", margin: 0,
    });

    s.addText(text, {
      x: 1.6, y, w: 7.8, h: rowH,
      fontFace: F.title, fontSize: 28, bold: true,
      color: C.deepSpace, align: "left", valign: "middle", margin: 0,
    });

    if (i < items.length - 1) {
      s.addShape(pres.shapes.LINE, {
        x: 0.5, y: y + rowH, w: 9.0, h: 0,
        line: { color: C.lightGray, width: 0.5 },
      });
    }
  });
}

// ── 出力 ──────────────────────────────────────────────────────
const path = require("path");
const outPath = path.join(__dirname, "..", "output", "general-template.pptx");

pres.writeFile({ fileName: outPath })
  .then(() => console.log("Done:", outPath))
  .catch(e => console.error(e));
