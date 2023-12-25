import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuid } from "uuid";
import Send from "../img/send.png";

const Input = () => {
  const [text, setText] = useState("");

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const [dollarsPerCharacter, setDollarsPerCharacter] = useState('');

  
  useEffect(() => {
    // Function to fetch the current setting from Firestore
    const fetchAttentionPrice = async () => {
        if (data?.user?.uid) {
            const docRef = doc(db, "users", data?.user?.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setDollarsPerCharacter(docSnap.data().dollarsPerCharacter || '');
            }
        }
    };

    fetchAttentionPrice();
  }, [data?.user]);

  const calculatedCost = (text.length * dollarsPerCharacter).toFixed(1);

  const handleSend = async () => {
    // Trim text and check if it is not empty
    const trimmedText = text.trim();
    if (!trimmedText) return;

    // Clear the text input immediately upon send
    setText("");

    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text: trimmedText,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    });

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text: trimmedText,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text: trimmedText,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
  };

  const handleKeyPress = (e) => {
    // Check if the pressed key is "Enter"
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevents the addition of a new line in the input on "Enter"
      handleSend();
    }
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="..."
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKeyPress} // Add the key press event handler
        value={text}
      />
      {text && (
        <div className="cost-display">
          ${calculatedCost}
        </div>
      )}
      <div className="send">
        <button onClick={handleSend}>
          <img src={Send} alt="Send" />
        </button>
      </div>
    </div>
  );
};

export default Input;

