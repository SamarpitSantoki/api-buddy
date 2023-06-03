import prisma from "@/db/prisma";
import { auth } from "@clerk/nextjs";
import { NextRequest } from "next/server";

export async function POST(request: Request) {

  const req = await request.json();
  let response = {};

  console.log(req);

  if (!req.label) {
    req.label = req.title.toLowerCase().split(" ").join("-");
  }

  try {
    const entry = await prisma.request.upsert({
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

export async function GET(request: NextRequest) {
  let workspaceId = request.nextUrl.searchParams.get("workspaceId");
  let response = {};
  
  try {
    const entry = await prisma.request.findMany(
      {
        where: {
          workspaceId: Number(workspaceId)
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
  let response = {};

  const id = request.url.split("?")[1].split("=")[1];

  console.log("context", id);

  try {
    const entry = await prisma.request.delete({
      where: {
        id: Number(id) || -1,
      },
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
