import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { Todo } from './types';
import { todoReducer } from './reducer';
import styles from '../styles/Home.module.css';

// Todoに関する状態と操作関数の型（Contextが持つ値）
type TodoContextType = {
  todos: Todo[];
  addTodo: (text: Todo['text']) => void;
  toggleTodo: (id: Todo['id']) => void;
  deleteTodo: (id: Todo['id']) => void;
  updateTodo: (id: Todo['id'], text: Todo['text']) => void;
  clearTodos: () => void;
  deleteCompleted: () => void;
};

// Contextの作成。初期値は undefined（Providerの外で使ったらエラーにする）
const TodoContext = createContext<TodoContextType | undefined>(undefined);

// Promiseで遅延付きデータ取得
const fakeFetchTodos = (): Promise<Todo[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        const stored = localStorage.getItem('todos');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (
            // parsedは配列で、中身のtodoの型が合っているか
            Array.isArray(parsed) &&
            parsed.every((todo) => typeof todo.id === 'number' && typeof todo.text === 'string')
          ) {
            resolve(parsed); // そのままstateに入れる
            return;
          }
        }
      } catch (e) {
        console.error('ローカルストレージ読み込み失敗:', e);
      }
      resolve([]); // データなかったら空配列を返す
    }, 2000); // 2秒の遅延
  });
};

// Provider：アプリ全体にTodoの状態と操作関数を提供
export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, dispatch] = useReducer(todoReducer, []); // useReducerで状態とdispatch関数を作る
  const [initialized, setInitialized] = useState(false); // 初期読み込みフラグ
  const [loading, setLoading] = useState(true); // ローディング状態

  // useEffectで遅延付きデータ取得
  useEffect(() => {
    fakeFetchTodos().then((todos) => {
      dispatch({ type: 'initTodos', todos });
      setInitialized(true);
      setLoading(false); // 読み込み完了！
    });
  }, []);

  // todosが変わるたび保存
  useEffect(() => {
    if (initialized) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos, initialized]);

  // イベント関数定義（dispatch隠蔽）
  const addTodo = (text: Todo['text']) => dispatch({ type: 'addTodo', text });
  const toggleTodo = (id: Todo['id']) => dispatch({ type: 'toggleTodo', id });
  const deleteTodo = (id: Todo['id']) => dispatch({ type: 'deleteTodo', id });
  const updateTodo = (id: Todo['id'], text: Todo['text']) =>
    dispatch({ type: 'updateTodo', id, text });
  const clearTodos = () => dispatch({ type: 'clearTodos' });
  const deleteCompleted = () => {
    dispatch({ type: 'deleteCompleted' });
  };

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, toggleTodo, deleteTodo, updateTodo, clearTodos, deleteCompleted }}
    >
      {loading ? (
        <div className={styles.loading}>
          <div className={styles.loadingBar}></div>
          <p>🌀 データを読み込んでるよ...</p>
        </div>
      ) : (
        children
      )}
    </TodoContext.Provider>
  );
};

// カスタムフック：Contextから状態と関数を取得する
export const useTodosContext = () => {
  const context = useContext(TodoContext);
  if (context === undefined) throw new Error('useTodosContext must be used within a TodoProvider');
  return context;
};
