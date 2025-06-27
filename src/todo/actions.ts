// actions.ts
import { Todo } from './types';

// Todoに対して実行できるアクションを型で定義
export type Action =
  | { type: 'addTodo'; text: Todo['text'] } //新しいTodoを追加（テキストだけ渡す）
  | { type: 'toggleTodo'; id: Todo['id'] } //チェック状態を切り替え（対象の id を渡す）
  | { type: 'deleteTodo'; id: Todo['id'] } //Todoを削除（対象の id を渡す）
  | { type: 'updateTodo'; id: Todo['id']; text: Todo['text'] } //TodoItemの編集用
  | { type: 'initTodos'; todos: Todo[] } // 初期データ一括読み込み
  | { type: 'clearTodos' } // リスト全削除
  | { type: 'deleteCompleted' }; // 完了済みを削除
