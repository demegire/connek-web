import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";
import { SettingsContextProvider } from "./context/SettingsContext";
import { SelectedSettingContextProvider } from "./context/SelectedSettingContext";
import { SearchedUserContextProvider } from "./context/SearchedUserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <ChatContextProvider>
      <SettingsContextProvider>
        <SelectedSettingContextProvider>
          <SearchedUserContextProvider>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </SearchedUserContextProvider>
        </SelectedSettingContextProvider>
      </SettingsContextProvider>
    </ChatContextProvider>
  </AuthContextProvider>
);
