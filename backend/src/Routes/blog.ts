import { PrismaClient } from "../generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { blogInputCheck, blogUpdateCheck } from "@rushh/medium";
type MyContextVariables = {
  prisma: ReturnType<PrismaClient["$extends"]>;
  userid: string;
  name: string;
};

type JwtPayload = {
  id: string;
};

const blogRouter = new Hono<{
  Variables: MyContextVariables;
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

blogRouter.use(async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  c.set("prisma", prisma);
  await next();
});

blogRouter.use(async (c, next) => {
  const token = c.req.header("Authorization");
  if (token) {
    const splittedtkn = token.split(" ")[1];
    try {
      const tk = (await verify(splittedtkn, c.env.JWT_SECRET)) as JwtPayload;
      c.set("userid", tk.id);
      const prisma: any = c.get("prisma");
      const { name } = await prisma.user.findUnique({
        where: { id: tk.id },
        select: {
          name: true,
        },
      });
      c.set("name", name);
      await next();
    } catch (e) {
      return c.json({ message: "You are not authenticated" }, 401);
    }
  } else {
    return c.json({ message: "You are not authenticated" }, 401);
  }
});

blogRouter.post("/", async (c) => {
  const prisma: any = c.get("prisma");
  const bdy = await c.req.json();
  const { success } = blogInputCheck.safeParse(bdy);
  console.log(success);
  if (!success) {
    return c.json(
      {
        message: "Inputs are not correct",
      },
      401
    );
  }
  const id = c.get("userid");
  let name = c.get("name");
  if (!name) {
    name = "anonymous";
  }
  console.log(name);
  const { title, content } = bdy;
  console.log(bdy);
  try {
    const newblog = await prisma.Posts.create({
      data: {
        title,
        content,
        authorId: id,
        name,
      },
    });
    //   console.log("dfdsf");
    return c.json(
      {
        message: "Blog updated successfully",
        newblog,
      },
      200
    );
  } catch (e) {
    return c.json(
      {
        message: "Error while adding blog",
      },
      401
    );
  }
});

blogRouter.put("/", async (c) => {
  const prisma: any = c.get("prisma");
  const userid = c.get("userid");
  const bdy = await c.req.json();
  const { success } = blogUpdateCheck.safeParse(bdy);
  if (!success) {
    return c.json(
      {
        message: "Inputs are not correct",
      },
      401
    );
  }
  try {
    const blog = await prisma.Posts.findUnique({
      where: { id: bdy.id },
    });
    if (!blog || blog.authorId != userid) {
      return c.json(
        {
          message: "This is not a valid blog",
        },
        401
      );
    }
    console.log(blog);
    const updatedblog = await prisma.Posts.update({
      where: { id: bdy.id },
      data: bdy,
    });
    return c.json(
      {
        message: "Blog updated successfully",
        updatedblog,
      },
      200
    );
  } catch (e) {
    return c.json(
      {
        message: "Error while updating blog",
      },
      402
    );
  }
});

blogRouter.get("/specific/:id", async (c) => {
  const id = c.req.param("id");
  const prisma: any = c.get("prisma");
  console.log(id);
  try {
    const blog = await prisma.Posts.findFirst({
      where: { id },
    });
    if (blog) {
      return c.json(
        {
          blog,
        },
        200
      );
    } else {
      return c.json(
        {
          message: "Wasn't able to find blog by this id",
        },
        401
      );
    }
  } catch (e) {
    return c.json(
      {
        message: "Wasn't able to find blog by this id",
      },
      401
    );
  }
});

blogRouter.get("/bulk", async (c) => {
  console.log("request comes ");
  const prisma: any = c.get("prisma");
  try {
    const Allblogs = await prisma.Posts.findMany({});
    console.log(Allblogs);
    return c.json(
      {
        Allblogs,
      },
      200
    );
  } catch (e) {
    return c.json(
      {
        message: "Wasn't able to find any blog",
      },
      401
    );
  }
});

export { blogRouter };
