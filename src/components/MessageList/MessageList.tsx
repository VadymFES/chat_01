import React, { useState } from "react";
import AddMessage from "../AddMessage/AddMessage";
import  "./MessageList.module.scss";

export default function MessageList(): JSX.Element {
  const [messages, setMessages] = useState<string[]>([]);

  const addMessage = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const newMessage = `${timestamp}: ${message}`;
    setMessages([...messages, newMessage]);
  };

  return (
    <section id="messages_list">
      <ul style={{ listStyleType: "none", padding: 10, margin: 0 }}>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <AddMessage onAddMessage={addMessage} />
      
    </section>
    
  );
}
