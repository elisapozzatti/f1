import Koa from "koa";
import cors from "@koa/cors";
import Router from "@koa/router";
import { google } from "googleapis";
import fs from "fs";
import { dbClient } from "./lib/db.js";
import { config } from "./config/config.js";
import driversRoute from "./route/drivers.js";
import teamsRoute from "./route/teams.js";
import circuitsRoute from "./route/circuits.js";
import calendarRoute from "./route/calendar.js";
import { createOAuthClient } from "./googleAuth.js";

dbClient();
const app = new Koa();
const router = new Router();

app.use(
  cors({
    origin: config.FRONTEND_APP,
  })
);

// Rotta di test
router.get("/", (ctx) => {
  ctx.body = "Server running!";
});

// Rotta per generare URL di autorizzazione
router.get("/auth", (ctx) => {
  const oAuth2Client = createOAuthClient();
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: "https://www.googleapis.com/auth/calendar",
    prompt: "consent",
  });

  ctx.body = `Autorizza cliccando sul link: <a href="${authUrl}" target="_blank">${authUrl}</a>`;
});

// Rotta di callback per ricevere il codice OAuth
router.get("/oauth2callback", async (ctx) => {
  const oAuth2Client = createOAuthClient();
  const code = ctx.query.code as string;

  if (!code) {
    ctx.body = "Nessun codice dato";
    return;
  }

  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);

  fs.writeFileSync("token.json", JSON.stringify(tokens, null, 2));
  ctx.body = "Token salvato!";
});

app.use(router.routes()).use(router.allowedMethods());

app.use(driversRoute.routes()).use(driversRoute.allowedMethods());
app.use(teamsRoute.routes()).use(teamsRoute.allowedMethods());
app.use(circuitsRoute.routes()).use(circuitsRoute.allowedMethods());
app.use(calendarRoute.routes()).use(calendarRoute.allowedMethods());

app.listen(3000, () => {
  console.log("Koa server running on http://localhost:3000");
});
