import React, { useContext } from "react";
import Navbar from "./Navbar";
import Chats from "./Chats";
import Search from "./Search"
import Settings from "./Settings"; // Import the Settings component
import { SettingsContext } from '../context/SettingsContext';


const Sidebar = () => {
  const { showSettings } = useContext(SettingsContext);

  return (
    <div className="sidebar">
      <Navbar/>
      {showSettings ? <Settings /> : (
      <>
        <Search /> 
        <Chats />
      </>
      )}
    </div>
  );
};

export default Sidebar;