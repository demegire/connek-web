import React, { useContext } from 'react'

import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import AccountSettings from '../components/AccountSettings';
import SecuritySettings from '../components/SecuritySettings';
import AttentionSettings from '../components/AttentionSettings';

import { SettingsContext } from '../context/SettingsContext';
import { SelectedSettingContext } from '../context/SelectedSettingContext';

const Home = () => {
  const { showSettings } = useContext(SettingsContext);
  const { selectedSetting } = useContext(SelectedSettingContext);
  const settingComponents = {
    'Account': AccountSettings,
    'Security': SecuritySettings,
    'Attention': AttentionSettings,
  };
  const SettingComponent = settingComponents[selectedSetting];

  return (
    <div className='home'>
      <div className="container">
        <Sidebar/>
        {showSettings ? <SettingComponent /> : <Chat/>}
      </div>
    </div>
  )
}

export default Home