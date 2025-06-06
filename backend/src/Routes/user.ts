import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "../generated/prisma/edge";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signUpCheck } from "@rushh/medium";
import { signInCheck } from "@rushh/medium";

const UserRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

UserRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const bdy = await c.req.json();
  const input = signUpCheck.safeParse(bdy);
  console.log(input);
  if (!input.success) {
    return c.json(
      {
        message: "Inputs are not correct",
      },
      401
    );
  }
  let { name, email, password } = bdy;
  try {
    if (name == "") {
      name = "anonymous";
    }
    const newuser = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    const token = await sign(
      {
        id: newuser.id,
      },
      c.env?.JWT_SECRET
    );

    return c.json({
      message: "User created Successfully",
      token,
    });
  } catch (e) {
    c.status(403);
    return c.json({
      error: "error while signing up",
    });
  }
});
UserRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const bdy = await c.req.json();
  const { success } = signInCheck.safeParse(bdy);
  if (!success) {
    return c.json(
      {
        message: "Inputs are not correct",
      },
      401
    );
  }
  const { email } = bdy;
  const userFind = await prisma.user.findUnique({ where: { email } });
  // console.log(userFind);
  if (!userFind) {
    return c.json({ message: "You Are not authenticated" });
  }
  const token = await sign({ id: userFind.id }, c.env.JWT_SECRET);
  return c.json({
    message: "Your new token",
    token,
  });
});

export { UserRouter };
