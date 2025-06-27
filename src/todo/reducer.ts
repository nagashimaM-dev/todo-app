import { Todo } from './types';
import { Action } from './actions';

// reducer関数：現在の状態とアクションに応じて新しい状態を返す
export const todoReducer = (state: Todo[], action: Action): Todo[] => {
  switch (action.type) {
    // 新しいTodoを作ってstateに追加
    case 'addTodo':
      // 配列から最大のidを探す
      const maxId = state.reduce((max, todo) => Math.max(max, todo.id), 0);
      const newTodo: Todo = {
        id: maxId + 1,
        text: action.text,
        completed: false,
      };
      return [...state, newTodo];
    // 指定したidのTodoの完了状態を反転
    case 'toggleTodo':
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    // 指定したidのTodoを削除
    case 'deleteTodo':
      return state.filter((todo) => todo.id !== action.id);
    // TodoItemの編集
    case 'updateTodo':
      return state.map((todo) => (todo.id === action.id ? { ...todo, text: action.text } : todo));
    // ローカルストレージ保存
    case 'initTodos':
      return action.todos;
    // 全削除
    case 'clearTodos':
      return [];
    // 完了済みのみ削除
    case 'deleteCompleted':
      return state.filter((todo) => !todo.completed);
    default:
      return state;
  }
};
