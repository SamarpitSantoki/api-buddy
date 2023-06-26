import MailInvite from "@/components/Email/InviteMail";
import prisma from "@/db/prisma";
import sendMail, { MailType } from "@/lib/sendMail";
import syncUserInDb from "@/lib/syncUserWithDb";
import { auth } from "@clerk/nextjs";

export async function POST(request: Request) {
  // const { userId, user } = auth();
  const userId = "asdasd";



  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  // if (user?.id) {
  //   syncUserInDb(user);
  // }

  const req = await request.json();
  let response = {};

  if (!req.name) {
    return new Response(
      JSON.stringify({
        data: [],
        status: false,
      })
    );
  }

  // if there are invites send them
  if (req.invites) {
    req.invites.map((item: any) => {
      console.log(item, "ITEMCHECK");

      try {
        sendMail({
          to: item.email,
          type: MailType.INVITE,
          react: MailInvite({}),
        });
      } catch (e) {
        console.log("Erorr is here");
      }
    });
    delete req.invites;
  }

  try {
    const entry = await prisma.workspace.upsert({
      where: {
        id: req.id || "new",
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
  const { userId } = auth();

  let response = {};

  try {
    const entry = await prisma.workspace.findMany({
      where: {
        userId: userId || "example",
      },

      select: {
        id: true,
        name: true,
        type: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        requests: {
          select: {
            id: true,
          },
        },
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

export async function DELETE(request: Request) {
  const { userId } = auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  let response = {};

  try {
    const req = await request.json();

    const entry = await prisma.workspace.delete({
      where: {
        id: req?.id || "0",
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
