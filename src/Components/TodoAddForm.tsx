import React, { useState, useRef, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import { useTodosContext } from '../todo/context';

const TodoAddForm = () => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { addTodo } = useTodosContext(); //TodoContextのdispatchを取り出すカスタムフック

  // ページ表示後に1回だけ実行：// 入力欄に自動でフォーカスを当てる
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // フォーム送信時の処理。Todoを追加し、入力欄をリセット
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // ページリロードを防ぐ
    if (input.trim() === '') return; // 空欄や空白だけなら追加しない
    addTodo(input);
    setInput('');
  };

  return (
    // 「追加」で送信する内容
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)} //入力内容が変わるたびにstate更新
        placeholder="やること入力してね"
        ref={inputRef} // 自動フォーカス用
      />
      <button className={styles.button} type="submit">
        ＋追加！
      </button>
    </form>
  );
};

export default TodoAddForm;
