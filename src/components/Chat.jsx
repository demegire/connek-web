import React, { useContext, useEffect } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const Chat = () => {
  const location = useLocation();
  const { currentUser } = useContext(AuthContext);
  const { data, dispatch } = useContext(ChatContext);
  const isChatPartnerSelected = data.chatId !== "null";

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const chatUserUid = queryParams.get("chat");

    const createGroupChat = async () => {
      if (!chatUserUid) return;
      let user = null;

      const docRef = doc(db, "users", chatUserUid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        user = docSnap.data();
      }

      const combinedId =
        currentUser.uid > chatUserUid
          ? currentUser.uid + chatUserUid
          : chatUserUid + currentUser.uid;
      try {
        const res = await getDoc(doc(db, "chats", combinedId));

        if (!res.exists()) {
          await setDoc(doc(db, "chats", combinedId), { messages: [] });

          await updateDoc(doc(db, "userChats", currentUser.uid), {
            [combinedId + ".userInfo"]: {
              uid: chatUserUid,
              displayName: user.displayName,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });

          await updateDoc(doc(db, "userChats", chatUserUid), {
            [combinedId + ".userInfo"]: {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
        }

        dispatch({ type: "CHANGE_USER", payload: user });
      } catch (err) {}
    };

    createGroupChat();
  }, []);

  return (
    <div className="chat">
      {isChatPartnerSelected && (
        <header className="chatHeader">
          <p>{data.user.displayName}</p>
          <Link to={`/${data.user.uid}`}>click here for user profile</Link>
        </header>
      )}
      <Messages chatData={data} />
      <Input />
    </div>
  );
};

export default Chat;
