import React, { useContext } from "react";
import { SelectedSettingContext } from '../context/SelectedSettingContext';

import AccountSettingsImage from "../img/user.png";
import SecuritySettingsImage from "../img/security.png";
import AttentionSettingsImage from "../img/attention.png";


const Settings = () => {
  const { selectedSetting, setSelectedSetting } = useContext(SelectedSettingContext);

  const settings = [{name: 'Account', image: AccountSettingsImage},
                    {name: 'Security', image: SecuritySettingsImage},
                    {name: 'Attention', image: AttentionSettingsImage}
                    ]

  return (
    <div className="chats">
      {settings.map((setting) => (
        <div
          className={`userChat ${selectedSetting === setting.name ? 'selected' : ''}`}
          key={setting.name}
          onClick={() => setSelectedSetting(setting.name)}
        >
          <img src={setting.image} alt="" style={{ filter: 'invert(100%)' }}/>
          <div className="userChatInfo">
            <span>{setting.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Settings;