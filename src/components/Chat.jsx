import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import { Link } from "react-router-dom";

const Chat = () => {
  const { data } = useContext(ChatContext);
  const isChatPartnerSelected = data.chatId !== "null";

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
