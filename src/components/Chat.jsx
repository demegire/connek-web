import React, { useContext, useState } from "react";
import Messages from "./Messages";
import Input from "./Input";

import { SearchedUserContext } from "../context/SearchedUserContext";

import ChatProfile from "./ChatProfile";



const Chat = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const { searchedUser } = useContext(SearchedUserContext);

  console.log(searchedUser);
  return (
    <div className="chat">
      {searchedUser.uid ? <ChatProfile user={searchedUser} isChatVisible={isChatVisible} setIsChatVisible={setIsChatVisible}/> : null}
      
        <div className="messageAndInput" style={isChatVisible ? {height:"100%"} : {height:0}}>
          <Messages isChatVisible={isChatVisible}/>
          <Input isChatVisible={isChatVisible}/>
        </div>
      
    </div>
  );
};

export default Chat;
