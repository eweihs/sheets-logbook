import { google } from "googleapis";
import moment from "moment";
import oauth2Client from "./oautch2Client";
import { RANGE } from "../const";

export default async function apppendToSheet(tokens, spreadsheetId, entry) {
  oauth2Client.setCredentials(tokens);
  const sheets = google.sheets({
    auth: oauth2Client,
    version: "v4"
  });
  const resource = {
    majorDimension: "ROWS",
    values: [[moment().format(), entry]]
  };
  const options = {
    spreadsheetId,
    range: RANGE,
    valueInputOption: "USER_ENTERED",
    resource
  };
  const response = await sheets.spreadsheets.values.append(options);

  console.log({ response });
  return response;
}
