import React, { useState, useEffect, useRef } from "react";
import AddMessage from "../AddMessage/AddMessage";
import styles from  "./MessageList.module.scss";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

export default function MessageList(): JSX.Element {
  const [messages, setMessages] = useState<string[]>([]);
  const [userColor, setUserColor] = useState<string>("");
  const userName = typeof window !== "undefined" ? localStorage.getItem("userName") : null;
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    socket.on('message', (message) => {
      // Check if the message was sent by the current user
      const isCurrentUser = message.includes(userName);

      // Add the message to the messages state array if it was not sent by the current user
      if (!isCurrentUser) {
        setMessages([...messages, message]);
      }
    });
  }, [messages, userName]);

  useEffect(() => {
    if (messagesEndRef.current) {
      // Scroll the container to the bottom
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);


  const addMessage = (message: string) => {
    if (!userName) {
      alert("Please set your name before sending a message.");
      return;
    }

    const timestamp = new Date().toLocaleTimeString();
    const newMessage = `${userName ? '<span style="color: ' + userColor + ';">' + userName + ': </span>' : ''}${message} <span style="font-size: 0.5em;">${timestamp}</span>` ;
    setMessages([...messages, newMessage]);

    socket.emit('new message', newMessage);
  };

  return (
    <section id="messages_list">
      <ul style={{
        listStyleType: "none",
        padding: 10,
        margin: 0,
        overflowY: messages.length > 1 ? "auto" : "hidden",
        overflowX:"hidden"
      }}>
        {messages.map((message, index) => (
          <li className={styles.list_li} key={index} dangerouslySetInnerHTML={{ __html: message }}></li>
        ))}
        <div ref={messagesEndRef} />
      </ul>
      <AddMessage onAddMessage={addMessage} />
    </section>
  );
}
