import { useEffect, useState } from "react";
import { google } from "googleapis";
import oauth2Client from "./oautch2Client";

export default function useGetSpreadSheet(tokens) {
  const [spreadsheetId, setSpreadsheetId] = useState(null);
  useEffect(() => {
    (async function getSheets() {
      try {
        const drive = google.drive({
          auth: oauth2Client,
          version: "v3"
        });
        const {
          data: { files }
        } = await drive.files.list({
          pageSize: 1,
          fields: "nextPageToken, files(id, name, mimeType)",
          q: "name='Sheets logbook'"
        });
        const [sheet] = files;
        if (sheet) {
          console.log({ sheet });
          setSpreadsheetId(sheet.id);
        }
      } catch (error) {
        console.log("couldn't find spreadsheet");
      }
    })();
  }, [tokens]);
  return spreadsheetId;
}
