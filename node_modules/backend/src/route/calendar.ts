import Router from "@koa/router";
import { getCalendar, calendarId } from "../calendar/calendarService.js";
import { insertEvents } from "../calendar/insertEvents.js";

const router = new Router({
  prefix: "/api/calendar",
});

router.get("/events", async (ctx) => {
  try {
    await insertEvents();

    const calendar = getCalendar();

    const response = await calendar.events.list({
      calendarId,
      timeMin: new Date("1950-01-01").toISOString(),
      timeMax: new Date("2100-01-01").toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    ctx.body = response.data.items;
  } catch (error: any) {
    ctx.status = 500;
    ctx.body = {
      error: "Errore nel caricamento del calendario",
      details: error.response?.data || error.message,
    };
    console.error(error);
  }
});

export default router;
