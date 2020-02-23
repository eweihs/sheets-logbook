import React, { useEffect, useState, useContext, Fragment } from "react";
import { observer } from "mobx-react-lite";
import { Redirect } from "react-router-dom";

import useQuery from "../util/useQuery";
import oauth2Client from "../util/oautch2Client";
import { userContext } from "../store";

const Auth = observer(() => {
  const store = useContext(userContext);
  const { setTokens, email } = store;
  const query = useQuery();
  const code = query.get("code");
  const [success, setSuccess] = useState(null);
  useEffect(() => {
    async function checkCode() {
      try {
        const { tokens } = await oauth2Client.getToken(code);
        console.log({ code, tokens });
        setTokens(tokens);
        setSuccess(true);
      } catch (error) {
        setSuccess(false);
        console.error(error);
      }
    }
    checkCode();
  }, [code, setTokens]);

  return (
    <Fragment>
      {email}
      {success === false && <h1>Something went wrong</h1>}
      {success === true && <Redirect to="/" />}
      {success === null && <h1>Authenticating...</h1>}
    </Fragment>
  );
});

export default Auth;
