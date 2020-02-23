import React, { Fragment, useContext } from "react";
import { google } from "googleapis";
import { observer } from "mobx-react-lite";
import { userContext } from "../store";
import oauth2Client from "../util/oautch2Client";
// import useReadSheet from "../util/useReadSheet";
import useGetSpreadSheet from "../util/useGetSpreadSheet";
import List from "./List";
import { Container, Typography } from "@material-ui/core";

const Home = observer(() => {
  const store = useContext(userContext);
  oauth2Client.setCredentials(store.tokens);
  // const [spreadsheetId, setSpreadsheetId] = useState("");
  const sheets = google.sheets({
    auth: oauth2Client,
    version: "v4"
  });
  const spreadsheetId = useGetSpreadSheet(store.tokens);
  // const sheet = useReadSheet(spreadsheetId, store.tokens);
  // console.log({ sheet });
  async function createSheet() {
    const { data } = await sheets.spreadsheets.create({});
    const { spreadsheetId } = data || {};

    console.log({ spreadsheetId });
    var requests = [
      {
        updateSpreadsheetProperties: {
          properties: {
            title: "Sheets logbook"
          },
          fields: "title"
        }
      }
    ];

    const reponse = await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      resource: { requests }
    });
    console.log({ reponse });
  }

  if (!store.email) {
    return (
      <Container>
        <Typography gutterBottom>Please login to continue</Typography>
      </Container>
    );
  }
  return (
    <Fragment>
      {store.email && (
        <Container>
          <Typography gutterBottom>
            Welcome back <b>{store.email}</b>
          </Typography>
        </Container>
      )}
      {spreadsheetId && store.email && (
        <List spreadsheetId={spreadsheetId} tokens={store.tokens} />
      )}
      {/* {spreadsheetId && <button onClick={readSheet}>Read Sheet</button>} */}
      {!spreadsheetId && <button onClick={createSheet}>Create Sheet</button>}
    </Fragment>
  );
});

export default Home;
