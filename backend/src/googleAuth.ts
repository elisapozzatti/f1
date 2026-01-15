import { google } from "googleapis";
import fs from "fs";

const CREDENTIALS_PATH = "credentials.json"; // client_id e client_secret
const TOKEN_PATH = "token.json";

export function createOAuthClient() {
  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, "utf-8"));
  const { client_id, client_secret, redirect_uris } = credentials.web;

  return new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
}

export function getAuthorizedClient() {
  const oAuth2Client = createOAuthClient();

  if (!fs.existsSync(TOKEN_PATH)) {
    throw new Error("Token OAuth mancante. Autorizza prima /auth");
  }

  const token = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf-8"));
  oAuth2Client.setCredentials(token);

  return oAuth2Client;
}
