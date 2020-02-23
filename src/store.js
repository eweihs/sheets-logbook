import React, { createContext } from "react";
import { useLocalStore } from "mobx-react-lite";

export const userContext = createContext();

export const UserProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    userData: {},
    userTokens: JSON.parse(localStorage.getItem("tokens")) || {},
    setUser(user) {
      console.log("setUser", user);
      store.userData = user;
    },
    setTokens(tokens) {
      console.log("setTokens", tokens);
      store.userTokens = tokens;
      localStorage.setItem("tokens", JSON.stringify(tokens));
    },
    clearStore() {
      store.userData = {};
      store.userTokens = {};
      localStorage.removeItem("tokens");
    },
    get email() {
      return store.userData && store.userData.email;
    },
    get loggedIn() {
      return !!store.userTokens.access_token;
    },
    get tokens() {
      return store.userTokens;
    }
  }));

  return <userContext.Provider value={store}>{children}</userContext.Provider>;
};
