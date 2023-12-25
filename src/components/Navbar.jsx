import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../firebase'
import { SettingsContext } from '../context/SettingsContext';

import Logout from "../img/logout.png";
import Settings from "../img/settings.png";
import Inbox from "../img/inbox.png";

const Navbar = () => {
  const { showSettings, toggleSettings } = useContext(SettingsContext);

  return (
    <div className='navbar'>
      <span className="logo">connek</span>
      <div className="user">
        <button onClick={toggleSettings}>
          {showSettings ? <img src={Inbox} alt="Inbox" /> : <img src={Settings} alt="Settings" /> }
        </button>
        <button onClick={()=>signOut(auth)}>
          <img src={Logout} alt="Logout" />
        </button>
      </div>
    </div>
  )
}

export default Navbar