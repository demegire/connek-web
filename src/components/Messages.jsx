import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import Message from "./Message";

const Messages = ({ chatData }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (chatData.chatId === "null") return;
    setIsLoading(true);

    const unSub = onSnapshot(doc(db, "chats", chatData.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
      setIsLoading(false);
    });

    return () => {
      unSub();
    };
  }, [chatData.chatId]);

  return (
    <div className="messages">
      {isLoading ? (
        <p style={{ color: "white", textAlign: "center" }}>Loading...</p>
      ) : (
        <>
          {messages.map((m) => (
            <Message message={m} key={m.id} />
          ))}
        </>
      )}
    </div>
  );
};

export default Messages;
