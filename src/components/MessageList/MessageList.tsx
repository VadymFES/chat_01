import React, { useState, useEffect } from "react";
import AddMessage from "../AddMessage/AddMessage";
import styles from  "./MessageList.module.scss";

export default function MessageList(): JSX.Element {
  const [messages, setMessages] = useState<string[]>([]);
  const [userColor, setUserColor] = useState<string>("");
  const userName = typeof window !== "undefined" ? localStorage.getItem("userName") : null;

  useEffect(() => {
    // generate a random color for the user if it's a new user
    const color = localStorage.getItem("userColor");
    if (!color) {
      const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
      setUserColor(randomColor);
      localStorage.setItem("userColor", randomColor);
    } else {
      setUserColor(color);
    }
  }, []);

  const addMessage = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const newMessage = `${userName ? '<span style="color: ' + userColor + ';">' + userName + ': </span>' : ''}${message} <span style="font-size: 0.5em;">${timestamp}</span>` ;
    setMessages([...messages, newMessage]);
  };

  return (
    <section id="messages_list">
      <ul style={{ listStyleType: "none", padding: 10, margin: 0 }}>
        {messages.map((message, index) => (
          <li className={styles.list_li} key={index} dangerouslySetInnerHTML={{ __html: message }}></li>
        ))}
      </ul>
      <AddMessage onAddMessage={addMessage} />
    </section>
  );
}
