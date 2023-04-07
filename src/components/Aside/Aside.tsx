import React, { useState, useEffect } from "react";
import styles from "./Aside.module.scss";

export default function Aside(): JSX.Element {
  const [users, setUsers] = useState([]);

  return (
    <aside className={styles.aside}>
      <h1>Users</h1>
      <ul>
name
      </ul>
    </aside>
  );
}
