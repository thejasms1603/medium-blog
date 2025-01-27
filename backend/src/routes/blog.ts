import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import bcrypt from "bcryptjs";
import { createBlogInput, updateBlogInput } from "@thejasgowda001/medium-common";


export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
        token:string,
        autHeader:string
    }
    Variables:{
        userId: string
    }
}>();


blogRouter.use("/*", async (c, next) => {
  try {
    // Get the Authorization header
    const authHeader = c.req.header("authorization") || "";
    if (!authHeader.startsWith("Bearer ")) {
      c.status(403);
      return c.json({ error: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    const user = await verify(token, c.env.JWT_SECRET);
    if (!user) {
      c.status(403);
      return c.json({ error: "Unauthorized" });
    }
    c.set("userId", user.id);
    await next();
  } catch (error) {
    console.error("Error verifying token:", error);
    c.status(403);
    return c.json({ error: "Unauthorized" });
  }
});

//above middleware extract the user id and pass it down to the route window
// in Hono c is context which acts as both req and res
blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if(!success)
    {
      c.status(411);
      return c.json({
        error:"Inputs are not correct"
      })
    }
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const authorId =  c.get("userId");
    try{
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: authorId,
      },
    }); 
        return c.json({
            id:post.id
        })
    } catch(e)
    {
        console.error(e);
        c.status(500);
        return c.json({
            error:"Error posting a blog!, Please try again"
        })
    }
});

blogRouter.put("/", async (c) => {
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
      c.status(411);
      return c.json({
        error: "Inputs are not correct",
      });
    }
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate());
    try{
        const blog = await prisma.post.update({
            where:{
                id:body.id
            },
            data:{
                title:body.title,
                content:body.content,
            }
        });
        return c.json({
            id:blog.id
        })
    } catch(e)
    {
        console.error(e);
        c.status(500);
        return c.json({
            error:"Error Updating a blog!, Please Try again"
        })
    }
});

// Should Add pagination to it
// to return some initial blogs and then update more blogs as user scrolls down
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const blogs = await prisma.post.findMany();
  return c.json({
    blogs,
  });
});


blogRouter.get("/:id", async (c) => {
     const id =  c.req.param("id");
     const prisma = new PrismaClient({
       datasourceUrl: c.env.DATABASE_URL,
     }).$extends(withAccelerate());
     try {
       const blog = await prisma.post.findFirst({
         where: {
           id: id,
         },
       });
       return c.json({
        blog
       });
     } catch (e) {
       console.error(e);
       return c.json({
         error: "Error fetching a blog!, Please Try again",
       });
     }
});









