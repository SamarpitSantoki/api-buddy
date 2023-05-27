import prisma from "@/db/prisma";

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
