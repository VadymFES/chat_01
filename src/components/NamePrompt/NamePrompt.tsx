import React, { useState } from 'react';

interface Props {
  onNameSubmit: (name: string) => void;
}

export default function NamePrompt({ onNameSubmit }: Props): JSX.Element {
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
