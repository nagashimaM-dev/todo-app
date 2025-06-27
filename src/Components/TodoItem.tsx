import React, { useState } from 'react';
import { useTodosContext } from '../todo/context';
import { Todo } from '../todo/types';
import styles from '../styles/Home.module.css';

type Props = {
  todo: Todo; // 表示対象の1つのTodoオブジェクト
  index: number; // Todoがリストの何番目か（1から始まる表示用）
};

// Todoアイテムの表示
const TodoItem = ({ todo, index }: Props) => {
  const { toggleTodo, deleteTodo, updateTodo } = useTodosContext();
  const [editText, setEditText] = useState(todo.text); // ローカルで管理する編集テキスト用のstate

  // テキストを編集→Enterで内容更新
  const handleUpdate = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (editText.trim() === '') return;
      updateTodo(todo.id, editText);
      e.currentTarget.blur(); // 編集確定後にフォーカス外す
    }
    if (e.key === 'Escape') {
      // 元のテキストに戻して、フォーカスも外す
      setEditText(todo.text);
      e.currentTarget.blur();
    }
  };

  return (
    <li className={styles.item}>
      {/* チェック状態の切り替え（トグル） */}
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={todo.completed} // 完了状態に応じてチェックされる
        onChange={() => toggleTodo(todo.id)} // 状態を反転させるアクション
      />

      <span className={styles.number}>{index + 1}.</span>

      {/* 編集用のテキスト入力欄。Enterキーで更新 */}
      <input
        type="text"
        maxLength={50}
        className={todo.completed ? styles.textDone : styles.text}
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        onKeyDown={handleUpdate}
      />

      {/* Todoの削除ボタン */}
      <button className={styles.delete} onClick={() => deleteTodo(todo.id)}>
        －削除
      </button>
    </li>
  );
};

export default TodoItem;
