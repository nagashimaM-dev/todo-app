# 🔧 実装メモ・ファイル構成

## ✅ 実装機能一覧

- **Todo の追加・編集**

  - フォームに入力 → 追加ボタンでリストに追加
  - 各 Todo のテキストは直接編集可能
    - `Enter`: 編集を確定（フォーカス解除）
    - `Esc`: 編集をキャンセル（元の値に戻る）

- **削除・完了切替**

  - チェックボックスで完了トグル
  - 削除ボタンで個別削除
  - 「すべて削除」「完了済みを削除」ボタンから一括削除（確認モーダルあり）

- **UI 表示制御**

  - 進捗バー（完了数／全体数で割合表示）
  - 「完了を隠す」トグルで非表示／表示切り替え
  - タスクが 0 件のときは、専用の UI を表示（🐈 が歩く）

- **データ保持**

  - ローカルストレージに Todo 配列を保存・読み出し
  - 初回レンダリング時に 2 秒のダミー遅延を入れ、「🌀 データを読み込んでるよ…」表示
  - 読み込み完了後に通常 UI へ切り替え

- **スクロール制御**
  - 追加時：リストの最下部へスクロール
  - 削除時：リストの先頭へスクロール

---

## 🧾 コンポーネント構成

```txt
<index.tsx>
└─ <TodoContainer>  ← Context Providerで全体状態を管理
    ├─ <TodoAddForm>    ← テキスト入力＆追加
    ├─ <TodoList>       ← Todo一覧表示
        ├─ <TodoItem>       ← 各アイテムの編集・完了・削除
        └─ <ConfirmModal>   ← 削除時の確認モーダル
```

---

## 📁 ディレクトリ構成

```txt
src/
├── Components/
│   ├── TodoAddForm.tsx      # 追加フォーム
│   ├── TodoContainer.tsx    # 親コンポーネント
│   ├── TodoItem.tsx         # 各TodoのUI
│   ├── TodoList.tsx         # 一覧表示・操作
│   └── ConfirmModal.tsx     # 削除確認モーダル
├── todo/
│   ├── actions.ts            # アクション定義
│   ├── context.tsx           # Context Providerとフック
│   ├── reducer.ts            # 状態更新ロジック
│   └── types.ts              # 型定義
└── styles/
    ├── global.css            # グローバルCSS
    └── Home.module.css       # 各種コンポーネント用CSS
```

---

## 🧠 状態管理の流れ

- `context.tsx` で `useReducer` を定義、`TodoProvider` で全体をラップ
- `useTodosContext()` フックを使って、各コンポーネントが `todos` を操作可能に
- `useEffect` でローカルストレージとの同期も実装

```tsx
useEffect(() => {
  if (initialized) {
    localStorage.setItem('todos', JSON.stringify(todos));
  }
}, [todos, initialized]);
```

---

## 💡 実装のこだわりポイント

- 状態の読み込みと保存のタイミングを制御するために `initialized` フラグを用意
- `loading` が true の間は UI をロックして、ローディング表示を挿入
- 各コンポーネントに責務を分け、読みやすく・管理しやすい構成に整理
