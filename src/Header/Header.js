import React, { useContext, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles
} from "@material-ui/core";
import oauth2Client, {
  getUserData as fetchUserData
} from "../util/oautch2Client";
import { observer } from "mobx-react-lite";
import { userContext } from "../store";

const scope = [
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/drive"
];

const url = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope
});

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      margin: 0
    },
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none"
    }
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbar: {
    flexWrap: "wrap"
  },
  toolbarTitle: {
    flexGrow: 1
  }
}));

const Header = observer(() => {
  const store = useContext(userContext);
  const classes = useStyles();
  useEffect(() => {
    console.log("[Header] useEffect", store.tokens);
    async function getUserData() {
      try {
        console.log("[Header] getUserData");
        const user = await fetchUserData(store.tokens);
        if (user) {
          store.setUser(user);
        } else {
          store.clearStore();
        }
      } catch (error) {
        console.log(error);
        store.clearStore();
      }
    }
    if (store.tokens) {
      getUserData();
    }
  }, [store]);

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar className={classes.toolbar}>
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          className={classes.toolbarTitle}
        >
          Sheets Logbook
        </Typography>
        {store.loggedIn ? (
          <Button
            onClick={store.clearStore}
            color="primary"
            variant="outlined"
            className={classes.link}
          >
            Logout
          </Button>
        ) : (
          <Button
            href={url}
            color="primary"
            variant="outlined"
            className={classes.link}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
});
export default Header;
