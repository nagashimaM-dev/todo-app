import React from 'react';
import styles from '../styles/Home.module.css';
import { TodoProvider } from '../todo/context';
import TodoList from './TodoList';
import TodoAddForm from './TodoAddForm';

// Todoアプリ全体のコンテナコンポーネント
// - ProviderでTodo状態管理を子コンポーネントに提供する
// - 画面タイトル、Todo追加フォーム、Todoリストを含む
const TodoContainer = () => {
  return (
    <TodoProvider>
      <div className={styles.container}>
        <h1 className={styles.title}>やることリスト</h1>
        <TodoAddForm />
        <TodoList />
      </div>
    </TodoProvider>
  );
};

export default TodoContainer;
