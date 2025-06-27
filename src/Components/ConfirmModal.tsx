import React, { useState } from 'react';
import styles from '../styles/Home.module.css';

type ConfirmModalProps = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmModal = ({ message, onConfirm, onCancel }: ConfirmModalProps) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p>{message}</p>
        <div className={styles.modalButtonContainer}>
          <button onClick={onConfirm} className={`${styles.modalBtn} ${styles.confirmButton}`}>
            はい
          </button>
          <button onClick={onCancel} className={`${styles.modalBtn} ${styles.cancelButton}`}>
            いいえ
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
