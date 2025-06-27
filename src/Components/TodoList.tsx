import React, { useState, useEffect, useRef } from 'react';
import { useTodosContext } from '../todo/context';
import TodoItem from './TodoItem';
import ConfirmModal from './ConfirmModal';
import styles from '../styles/Home.module.css';

// Todoのリストを描画。各アイテムに TodoItem を使う
const TodoList = () => {
  const { todos, clearTodos, deleteCompleted } = useTodosContext();
  const [hideCompleted, setHideCompleted] = useState(false);

  // 全削除・完了済み削除用モーダル
  const [showClearAllConfirm, setShowClearAllConfirm] = useState(false);
  const [showDeleteCompletedConfirm, setShowDeleteCompletedConfirm] = useState(false);

  const listRef = useRef<HTMLUListElement>(null); // Todoリストのリスト部分への参照を保持
  const prevTodosRef = useRef<typeof todos>([]); // 前回のtodosを保持

  // 全何件・完了済みが何件か
  const totalCount = todos.length;
  const completedCount = todos.filter((todo) => todo.completed).length;
  // 完了済みの割合を計算
  const progressPercent = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  // 非表示設定が有効な場合、未完了だけ表示
  const visibleTodos = hideCompleted ? todos.filter((todo) => !todo.completed) : todos;

  // 新しいTodo追加でスクロールバーを下に移動、削除で上に移動
  useEffect(() => {
    const prevTodos = prevTodosRef.current;
    const list = listRef.current;

    if (!list) return;
    if (todos.length > prevTodos.length) {
      list.scrollTop = list.scrollHeight;
    } else if (todos.length < prevTodos.length) {
      list.scrollTop = 0;
    }
    // 現在の todos を次のレンダリングのために保存
    prevTodosRef.current = todos;
  }, [todos]); // todos更新時に実行

  // 進捗バーとボタン
  const renderProgressAndButtons = () => (
    <>
      <div className={styles.counter}>
        {/* 進捗バー */}
        <div className={styles.progressWrapper}>
          <div className={styles.progressText}>
            進捗: {progressPercent}%（{completedCount} / {totalCount}）
          </div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>

        {/* 完了済みを隠すボタン */}
        <label className={styles.toggle}>
          <input
            type="checkbox"
            checked={hideCompleted}
            onChange={() => setHideCompleted(!hideCompleted)}
          />
          完了済をかくす
        </label>
      </div>

      {/* 完了済みを削除・全削除ボタン */}
      <div className={styles.clearButtons}>
        <button
          className={styles.clearButton}
          disabled={completedCount === 0}
          onClick={() => setShowDeleteCompletedConfirm(true)}
        >
          完了済みを削除
        </button>
        <button className={styles.clearButton} onClick={() => setShowClearAllConfirm(true)}>
          すべて削除
        </button>
      </div>
    </>
  );

  // Todoリスト表示
  const renderTodoList = () => (
    <ul className={styles.list} ref={listRef}>
      {visibleTodos.map((todo, index) => (
        <TodoItem key={todo.id} todo={todo} index={index} />
      ))}
    </ul>
  );

  // リスト０件のときの表示
  const renderEmptyState = () => (
    <div className={styles.emptyWrapper}>
      <p className={styles.empty}>やることがないよ</p>
      <div className={styles.catWalk}></div>
    </div>
  );

  return (
    <>
      {/* リストがあるときの表示 */}
      {todos.length > 0 && renderProgressAndButtons()}
      {/* リストがない時の表示 */}
      {visibleTodos.length === 0 ? renderEmptyState() : renderTodoList()}

      {/* モーダル */}
      {showDeleteCompletedConfirm && (
        <ConfirmModal
          message="完了済みのタスクを削除してもいい？"
          onConfirm={() => {
            deleteCompleted();
            setShowDeleteCompletedConfirm(false);
          }}
          onCancel={() => setShowDeleteCompletedConfirm(false)}
        />
      )}
      {showClearAllConfirm && (
        <ConfirmModal
          message="ほんとに全部消していい？"
          onConfirm={() => {
            clearTodos();
            setShowClearAllConfirm(false);
          }}
          onCancel={() => setShowClearAllConfirm(false)}
        />
      )}
    </>
  );
};

export default TodoList;
