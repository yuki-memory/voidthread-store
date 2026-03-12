# Demo Fashion Store

ポートフォリオ用 ECサイト デモプロジェクトです。  
HTML / CSS / JavaScript のみで構成された静的サイトです。

## フォルダ構成

```
project-root/
│
├─ pages/                  # メインページ
│   ├─ index.html          # トップページ（商品一覧）
│   ├─ cart.html           # カートページ
│   ├─ favorite.html       # お気に入りページ
│   ├─ login.html          # ログインページ
│   └─ register.html       # 会員登録ページ
│
├─ products/               # 商品関連ページ
│   ├─ list.html           # カテゴリ別 商品一覧
│   └─ detail.html         # 商品詳細ページ（動的テンプレート）
│
├─ assets/                 # 静的アセット
│   ├─ css/
│   │   ├─ style.css       # メインスタイルシート
│   │   └─ reset.css       # CSSリセット
│   ├─ js/
│   │   ├─ products-data.js  # 商品データ定義
│   │   ├─ storage.js        # localStorage 管理・バッジ表示
│   │   ├─ script.js         # ナビゲーション・UI制御
│   │   ├─ product-renderer.js # 商品一覧・詳細の動的生成
│   │   ├─ items.js          # カテゴリフィルター
│   │   ├─ shopping.js       # カート・お気に入り追加処理
│   │   ├─ cart.js           # カートページ表示処理
│   │   └─ favorite.js       # お気に入りページ表示処理
│   └─ img/                # 商品画像・アイコン
│
└─ README.md
```

## 主な機能

- **商品一覧表示** — JavaScriptによる動的生成
- **カテゴリフィルター** — カテゴリ選択による商品の絞り込み
- **商品詳細ページ** — URLパラメータ（`?id=`）による動的表示
- **カート機能** — localStorageを使用した商品の追加・削除・合計金額計算
- **お気に入り機能** — localStorageを使用した商品の保存・削除
- **バナースライダー** — CSSアニメーションによる自動画像切り替え

## 使用技術

- HTML5
- CSS3（アニメーション・レスポンシブ対応）
- JavaScript（ES6+）
- jQuery 3.4.1

## JavaScript モジュール構成

| ファイル | 責務 |
|---|---|
| `products-data.js` | 商品データの定義 |
| `storage.js` | localStorage の読み書き・バッジ管理 |
| `script.js` | ナビゲーション・ヘッダー固定・もっと見る |
| `product-renderer.js` | 商品一覧・詳細ページの動的レンダリング |
| `items.js` | カテゴリ別フィルタリング |
| `shopping.js` | カート・お気に入りへの追加処理 |
| `cart.js` | カートページの表示・削除・注文処理 |
| `favorite.js` | お気に入りページの表示・削除処理 |
