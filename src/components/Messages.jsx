import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import Message from "./Message";

const Messages = ({ chatData }) => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatData.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [chatData.chatId]);

  return (
    <div className="messages">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
