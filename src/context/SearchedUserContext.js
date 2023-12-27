import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export const SearchedUserContext = createContext();

export const SearchedUserContextProvider = ({ children }) => {
  const [searchedUser, setSearchedUser] = useState({});
    
  return (
    <SearchedUserContext.Provider value={{ searchedUser,setSearchedUser }}>
      {children}
    </SearchedUserContext.Provider>
  );
};
