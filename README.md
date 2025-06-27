# 📝 React × TypeScript 製 Todo アプリ

Next.js × TypeScript で実装したローカル完結型の Todo 管理アプリです。  
状態管理には Context + useReducer を使用し、型安全かつコンポーネント志向での開発を意識しました。

<img src="./docs/loading-screen.png" width="400" />
<img src="./docs/app-overview.png" width="400" />
<img src="./docs/delete-all-modal.png" width="400" />
<img src="./docs/empty-task-list.png" width="400" />

## 🚀 実装済みの機能

- Todo の追加・編集・削除・完了切替（キーボード操作対応）
- ローカルストレージに保存＆初回ローディング時のダミー遅延表示
- 進捗バー・完了 Todo の非表示切り替え・空リスト時の専用画面
- 全削除時の確認モーダル
- スクロール自動制御（追加時は最下部へ、削除時は最上部へ）

## 🧠 技術構成

- **フロントエンド**: React (Next.js) + TypeScript
- **状態管理**: React Context + useReducer
- **スタイル**: CSS Modules
- **データ永続化**: LocalStorage

## 🔧 起動方法

```bash
# パッケージをインストール
npm install

# 開発サーバーを起動
npm run dev
```
