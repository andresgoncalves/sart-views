import { useState } from "react";
import styles from "./Tag.module.scss";

export default function Tag({ name, selected, toggleSelection }) {
  const handleClick = () => {
    toggleSelection(name);
  };

  const containerClassName = `${styles.container} ${selected ? styles.active : ""}`;

  return (
    <div className={containerClassName} onClick={handleClick}>
      <div className={styles.label}>{name}</div>
    </div>
  );
}


