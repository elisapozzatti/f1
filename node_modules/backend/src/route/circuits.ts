import Router from "@koa/router";
import circuitSchema from "../models/circuits.js";

const router = new Router({
  prefix: "/api/circuits",
});

//get tutti i circuiti
router.get("/", async (ctx) => {
  try {
    const circuits = await circuitSchema.find();
    ctx.body = circuits;
    ctx.status = 200;
  } catch (errore) {
    ctx.status = 404;
    ctx.body = { error: "Errore nel trovare i dati" };
  }
});

export default router;
