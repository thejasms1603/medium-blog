import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import bcrypt from "bcryptjs";
import { signinInput, signupInput } from "@thejasgowda001/medium-common";

export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        JWT_SECRET: string,
        authHeader: string,
        token:string
    }
}>();


userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if(!success)
  {
    c.status(411)
    return c.json({
      error:"Inputs are not correct"
    })
  }
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(body.password, saltRounds);
    const user = await prisma.user.create({
      data: {
        email: body.username,
        password: hashedPassword,
        name:body.name
      },
    });
    const jwtToken = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwtToken });
  } catch (e) {
    c.status(403);
    return c.json({
      error: "Error while sign up",
    });
  }
});

userRouter.post("/signin", async (c) => {
   const body = await c.req.json();
   const {success} = signinInput.safeParse(body);
   if(!success)
   {
    c.status(411);
    return c.json({
      error:"Inputs are not correct"
    })
   }
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.username,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({
        error: "User not found",
      });
    }
    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) {
      c.status(403);
      return c.json({
        error: "Invalid email or password",
      });
    }
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
  } catch (e) {
    console.error("Error occured", e);
    c.status(500);
    return c.json({
      error: "Error while signing in",
    });
  }
});
