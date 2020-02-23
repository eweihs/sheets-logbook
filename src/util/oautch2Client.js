import { google } from "googleapis";
import { CLIENT_ID, CLIENT_SECRET } from "../const";

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  "https://k3lmm.csb.app/auth"
);

export default oauth2Client;

export const getUserData = async tokens => {
  try {
    oauth2Client.setCredentials(tokens);
    console.log({ google });
    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: "v2"
    });

    const { data } = await oauth2.userinfo.v2.me.get({});
    console.log({ data });
    return data;
  } catch (error) {
    return null;
  }
};
