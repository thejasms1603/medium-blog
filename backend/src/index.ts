import { Hono } from 'hono'
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode,sign, verify } from 'hono/jwt'
import bcrypt from "bcryptjs";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
    authHeader: String;
    token:String
  };
}>();

app.use("/api/v1/blog/*", async (c, next) => {
  try {
    // Get the Authorization header
    const authHeader = c.req.header("authorization") || "";
    if (!authHeader.startsWith("Bearer ")) {
      c.status(403);
      return c.json({ error: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    const response = await verify(token, c.env.JWT_SECRET);
    if (!response) {
      c.status(403);
      return c.json({ error: "Unauthorized" });
    }
    c.set("userId", response.id);
    await next();
  } catch (error) {
    console.error("Error verifying token:", error.message);
    c.status(403);
    return c.json({ error: "Unauthorized" });
  }
});

app.post('/api/v1/signup', async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(body.password, saltRounds);
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password:hashedPassword,
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
})

app.post('/api/v1/signin',async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  try
  {
    const user = await prisma.user.findUnique({
      where:{
        email:body.email,
      }
    });
    
    if(!user)
      {
        c.status(403);
        return c.json({
          error:"User not found"
        })
      }
      const isPasswordValid = await bcrypt.compare(body.password, user.password);
      if(!isPasswordValid)
        {
          c.status(403);
          return c.json({
            error:"Invalid email or password"
          })
        }
        const jwt = await sign({id:user.id}, c.env.JWT_SECRET);
        return c.json({jwt})
  } catch(e)
  {
    console.error("Error occured", e.message);
    c.status(500);
    return c.json({
      error:"Error while signing in"
    })
  }
})

app.get("/api/v1/blog/:id", (c) => {
  return c.text("Get Blog Route");
});

app.post('/api/v1/blog', (c)=>{
  return c.text("Blog Post Route")
})

app.put("/api/v1/blog", (c)=>{
  return c.text("Blog Update Route")
})

app.get('/api/v1/blog/bulk', (c)=>{
  return c.text('Get All Blogs')
})


export default app
