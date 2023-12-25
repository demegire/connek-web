import { createContext, useState } from "react";

export const SettingsContext = createContext();

export const SettingsContextProvider = ({ children }) => {
  const [showSettings, setShowSettings] = useState(false);
  const toggleSettings = () => setShowSettings(!showSettings);

  return (
    <SettingsContext.Provider value={{ showSettings, toggleSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};