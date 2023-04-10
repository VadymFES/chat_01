import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import styles from './Aside.module.scss';

interface User {
  id: string;
  name: string;
}

interface Props {
  onNameSubmit: (name: string) => void;
}

function NamePrompt({ onNameSubmit }: Props): JSX.Element {
  const [name, setName] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (name) {
      onNameSubmit(name);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your name:
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default function Aside(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  const [showNamePrompt, setShowNamePrompt] = useState(true);

  useEffect(() => {
    const socket = io('http://localhost:3001');

    const storedName = localStorage.getItem('userName');
    if (storedName) {
      socket.emit('new user', storedName);
      setShowNamePrompt(false);
    }

    socket.on('users', (users: string[]) => {
      setUsers(users.map((name, index) => ({ id: index.toString(), name })));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  function handleNameSubmit(name: string) {
    setShowNamePrompt(false);
    const socket = io('http://localhost:3001');
    socket.emit('new user', name);
    localStorage.setItem('userName', name);
  }

  return (
    <aside className={styles.aside}>
      <h1>Users</h1>
      {showNamePrompt && <NamePrompt onNameSubmit={handleNameSubmit} />}
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </aside>
  );
}
