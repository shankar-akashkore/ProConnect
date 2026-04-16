import React from "react";
import styles from "./style.module.css";

function Toast({ open, variant = "info", title, message }) {
  if (!open) {
    return null;
  }

  return (
    <div className={`${styles.toast} ${styles[variant]}`} role="status" aria-live="polite">
      <div className={styles.iconWrapper}>
        <span className={styles.icon}>
          {variant === "success" ? "✓" : variant === "error" ? "!" : "..."}
        </span>
      </div>
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
}

export default Toast;
