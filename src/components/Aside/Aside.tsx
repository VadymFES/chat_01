import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import styles from './Aside.module.scss';

interface User {
  id: string;
  name: string;
}

export default function Aside(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const socket = io('http://localhost:3001');

    socket.on('users', (users: string[]) => {
      setUsers(users.map((name, index) => ({ id: index.toString(), name })));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <aside className={styles.aside}>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </aside>
  );
}
