import prisma from "@/db/prisma";
import { auth } from "@clerk/nextjs";

export async function POST(request: Request) {

  const {userId} = auth();
  
  if(!userId){
    return new Response("Unauthorized", { status: 401 });
  }

  const req = await request.json();
  let response = {};

  console.log(req);

  if (!req.name) {
    return new Response(
      JSON.stringify({
        data: [],
        status: false,
      })
    );
  }

  try {
    const entry = await prisma.workspace.upsert({
      where: {
        id: req?.id || 0,
      },
      update: req,
      create: req,
    });

    response = {
      data: entry,
      status: true,
    };
  } catch (e) {
    response = {
      data: [],
      status: false,
    };

    console.log(e);
  }
  return new Response(JSON.stringify(response));
}

export async function GET(request: Request) {
  const {userId} = auth();
 
  let response = {};

  try {
    const entry = await prisma.workspace.findMany(
      
      {
        where:{
          userId: userId || "example",
        },

        select:{
          id: true,
          name: true,
          type: true,
          description: true,
          createdAt: true,
          updatedAt: true,
          requests: {
            select: {
              id: true,
            }
          }
        }
      }
    );


    response = {
      data: entry,
      status: true,
    };
  } catch (e) {
    console.log(e);
    response = {
      data: [],
      status: false,
    };
  }

  return new Response(JSON.stringify(response));
}

export async function DELETE(request: Request) {
  const {userId} = auth();
  
  if(!userId){
    return new Response("Unauthorized", { status: 401 });
  }
  
  let response = {};

  try {
    const req = await request.json();

    const entry = await prisma.workspace.delete({
      where: {
        id: req?.id || 0,
      },
    });

    response = {
      data: entry,
      status: true,
    };
  } catch (e) {
    console.log(e);
    response = {
      data: [],
      status: false,
    };
  }

  return new Response(JSON.stringify(response));
}
