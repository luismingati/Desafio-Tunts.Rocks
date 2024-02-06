import { google } from 'googleapis';

async function getAuthSheets() {
  const auth = new google.auth.GoogleAuth({
    keyFile: "./src/credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  const client = await auth.getClient();

  const googleSheets = google.sheets({
    version: "v4",
    auth: auth,
  });
  const spreadsheetId = '1Ec-19lRX_7TBg_7SkcK4TUcCKjADLvYhR5rTxaGggCI';

  return {
    auth,
    client,
    googleSheets,
    spreadsheetId,
  };
}

export default getAuthSheets;