import { Hono } from "hono";
import appRouter from "./Routes";
import { cors } from "hono/cors";

const app = new Hono();
app.use("*", cors());

app.route("/api/v1", appRouter);

export default app;
