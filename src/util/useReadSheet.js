import { useEffect, useState } from "react";
import { google } from "googleapis";
import oauth2Client from "./oautch2Client";
import { RANGE } from "../const";

export default function useReadSheet(spreadsheetId, tokens, shouldRefresh) {
  const [values, setValues] = useState(null);
  useEffect(() => {
    (async function readSheet() {
      console.log("[useReadSheet] readSheet");
      try {
        oauth2Client.setCredentials(tokens);
        const sheets = google.sheets({
          auth: oauth2Client,
          version: "v4"
        });
        const { data } = await sheets.spreadsheets.values.get({
          spreadsheetId,
          range: RANGE
        });
        console.log({ data });
        setValues(data.values);
      } catch (error) {
        console.log(error);
        setValues(null);
      }
    })();
  }, [spreadsheetId, tokens, shouldRefresh]);
  return values;
}
