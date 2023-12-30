import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);
  const isChatPartnerSelected = data.chatId !== "null";

  return (
    <div className="chat">
      {isChatPartnerSelected && (
        <header className="chatHeader">
          <p>{data.user.displayName}</p>
          <a href={`/profile/${data.user.uid}`}>click here for user profile</a>
        </header>
      )}
      <Messages chatData={data} />
      <Input />
    </div>
  );
};

export default Chat;
