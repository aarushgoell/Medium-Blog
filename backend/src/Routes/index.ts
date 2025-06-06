import { Hono } from "hono";
import { UserRouter } from "./user";
import { blogRouter } from "./blog";

const appRouter = new Hono();

appRouter.route("/blog", blogRouter);
appRouter.route("/user", UserRouter);

export default appRouter;
