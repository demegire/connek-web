import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";
import { SettingsContextProvider } from "./context/SettingsContext";
import { SelectedSettingContextProvider } from "./context/SelectedSettingContext";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <ChatContextProvider>
      <SettingsContextProvider>
        <SelectedSettingContextProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </SelectedSettingContextProvider>
      </SettingsContextProvider>
    </ChatContextProvider>
  </AuthContextProvider>
);
