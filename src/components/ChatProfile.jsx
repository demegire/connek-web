import { useState, useEffect } from "react";

const ChatProfile = ({ user, isChatVisible, setIsChatVisible }) => {
  useEffect(() => {
    if (isChatVisible) setIsChatVisible(false);
  }, [user]);

  return (
    <div className="chatProfile">
      <img src={user.photoURL} alt="user" />
      <h3 className="chatProfileUsername">{user.displayName}</h3>
      <p className="chatProfileMessageCost">
        {user.dollarsPerCharacter
          ? user.dollarsPerCharacter + "$ / Character"
          : "Chat price not specified."}
      </p>
      <p className="chatProfileResponseRate">
        Responds to
        <span
          className={
            user.responseRate >= 50 ? "highlighted-green" : "highlighted-red"
          }
        >
          {" "}{user.responseRate}%{" "}
        </span>
        of the users within a day.
      </p>
      <button
        onClick={() => {
          let visibility = isChatVisible;
          setIsChatVisible(!visibility);
        }}
        className="startChat"
      >
        {isChatVisible ? "End Chat" : "Start Chatting"}
      </button>
    </div>
  );
};

export default ChatProfile;
