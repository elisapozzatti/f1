import eventi from "./eventsCalendar.js";
import { google } from "googleapis";
import { createOAuthClient } from "../googleAuth.js";

const oAuth2Client = createOAuthClient();

const calendar = google.calendar({ version: "v3", auth: oAuth2Client });
const calendarId = "primary";

export async function insertEvents() {
  try {
    for (const e of eventi) {
      const existing = await calendar.events.list({
        calendarId,
        timeMin: new Date(e.start).toISOString(),
        timeMax: new Date(e.end).toISOString(),
        q: e.summary,
        singleEvents: true,
      });

      if (existing.data.items?.length) continue;

      const res = await calendar.events.insert({
        calendarId,
        requestBody: {
          summary: e.summary,
          start: { dateTime: e.start, timeZone: "Europe/Rome" },
          end: { dateTime: e.end, timeZone: "Europe/Rome" },
        },
      });
      console.log("Evento inserito:", res.data.summary, res.data.id);
    }
    console.log("Tutti gli eventi sono stati inseriti!");
  } catch (err: any) {
    console.error("Errore inserimento evento:", err.response?.data || err);
    throw err;
  }
}
