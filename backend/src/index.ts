import { Hono } from 'hono'
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode,sign, verify } from 'hono/jwt'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
    authHeader: String;
    token:String
  };
}>();

app.use('/api/v1/blog/*', async (c,next)=>{
  //get the header and verify the header
  // if it is correct then proceed if not forbidden 
  const authHeader = c.req.header("authorization") || " ";
  //Bearer Token = {"Bearer", "token"}
  const token = authHeader.split(" ")[1];
  const response = await verify(token, c.env.JWT_SECRET);
  if(!response)
  {
    c.status(403)
    return c.json({
      error:"Unauthorized"
    })
  }
  c.set('userId', response.id)
  await next();
})

app.post('/api/v1/signup', async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
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
  const user = await prisma.user.findUnique({
    where:{
      email:body.email,
      password:body.password
    }
  });

  if(!user)
  {
    c.status(403);
    return c.json({
      error:"User not found"
    })
  }
  const jwt = await sign({id:user.id}, c.env.JWT_SECRET);
  return c.json({jwt})
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


export default app
