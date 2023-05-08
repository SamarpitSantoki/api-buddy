import prisma from "@/db/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const req = await request.json();
  let response = {};

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
export async function GET(request: Request) {
  let response = {};

  try {
    const entry = await prisma.request.findMany();

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
  const req = await request.json();
  let response = {};

  try {
    const entry = await prisma.request.delete({
      where: {
        id: req?.id || 0,
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
