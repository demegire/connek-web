import { createContext, useState } from "react";

export const SelectedSettingContext = createContext();

export const SelectedSettingContextProvider = ({ children }) => {
  const [selectedSetting, setSelectedSetting] = useState('Account');

  return (
    <SelectedSettingContext.Provider value={{ selectedSetting, setSelectedSetting }}>
      {children}
    </SelectedSettingContext.Provider>
  );
};