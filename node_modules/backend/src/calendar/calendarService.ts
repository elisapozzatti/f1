import { google } from "googleapis";
import { getAuthorizedClient } from "../googleAuth.js";

export function getCalendar() {
  const authClient = getAuthorizedClient();

  return google.calendar({
    version: "v3",
    auth: authClient,
  });
}

export const calendarId = "primary";
