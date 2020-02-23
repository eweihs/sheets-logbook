import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserProvider } from "./store";

import Header from "./Header";
import Home from "./Home";
import Auth from "./Auth";

export default function App() {
  return (
    <UserProvider>
      <Router>
        <div>
          <Header />
          <Switch>
            <Route path="/auth">
              <Auth />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </UserProvider>
  );
}
