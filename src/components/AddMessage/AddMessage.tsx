import React, { useState } from "react";
import styles from "./AddMessage.module.scss";

interface AddMessageProps {
  onAddMessage: (message: string) => void;
}

export default function AddMessage({ onAddMessage }: AddMessageProps): JSX.Element {
  const [message, setMessage] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && message) {
      onAddMessage(message);
      setMessage("");
    } else if (e.key === "Enter" && !message) {
      alert("Please enter a message");
    }
  };
  

  return (
    <section className={styles.new_message}>
      <textarea
        className={styles.message_input}
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />

    </section>
  );
}
