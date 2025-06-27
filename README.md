### `README.md`

# 📝 React × TypeScript 製 Todo アプリ

Next.js × TypeScript で約 4 日間かけて作成した、ローカル完結型の Todo 管理アプリです。
状態管理には Context + useReducer を使用し、型安全かつコンポーネント志向の開発を意識しました。

<div align="center">
<img src="./docs/loading-screen.png" width="350" />
<img src="./docs/app-overview.png" width="350" />
<img src="./docs/delete-all-modal.png" width="350" />
<img src="./docs/empty-task-list.png" width="350" />
</div>
---

## 🚀 主な機能

- Todo の追加・編集・削除・完了切替〈キーボード操作対応〉
- ローカルストレージ保存・初回読み込み時のローディング表示〈2 秒ダミー遅延〉
- 進捗バー、完了 Todo の非表示切り替え、空リスト時の専用 UI
- 削除操作時の確認モーダル
- スクロール制御〈追加時は最下部へ、削除時は最上部へ〉

---

## 🧠 技術スタック

- **フレームワーク**: React (Next.js)
- **言語**: TypeScript
- **状態管理**: React Context + useReducer
- **スタイル**: CSS Modules
- **データ保持**: LocalStorage

---

## 🔧 開発環境と起動方法

```bash
# パッケージをインストール
npm install

# 開発サーバーを起動
npm run dev
```

アプリは `http://localhost:3000` で確認できます。

---

## 🗓️ 製作期間

2025 年 6 月 ● 日 ～ ● 日　(約 4 日間)

---

## 📁 関連資料 (docs/)

- [`docs/overview.md`](./docs/overview.md) ：開発背景・目的・アピールポイント
- [`docs/implementation.md`](./docs/implementation.md) ：機能詳細・構成・データ流れ
