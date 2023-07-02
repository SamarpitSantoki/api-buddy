import MailInvite from '@/components/Email/InviteMail';
import prisma from '@/db/prisma';
import sendMail, { MailType } from '@/lib/sendMail';
import syncUserInDb from '@/lib/syncUserWithDb';
import { auth, currentUser } from '@clerk/nextjs';

export async function POST(request: Request) {
  const { userId } = auth();

  // const userId = 'asdasd';
  const user = await currentUser();

  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  if (user?.id) {
    await syncUserInDb(user);
  }

  const req = await request.json();
  const invites = req.invites;

  delete req.invites;

  let response = {};

  if (!req.name) {
    return new Response(
      JSON.stringify({
        data: [],
        status: false,
      })
    );
  }

  let workspaceId;

  // create workspace
  try {
    const entry = await prisma.workspace.upsert({
      where: {
        id: req.id || 'new',
      },
      update: req,
      create: req,
    });

    workspaceId = entry.id;

    response = {
      data: entry,
      status: true,
    };
  } catch (e) {
    response = {
      data: [],
      status: false,
    };
  }

  // if there are invites create team and send invites
  if (invites) {
    const team = await prisma.team.create({
      data: {
        AdminId: userId,
        users: {
          connect: [
            {
              clerkId: userId,
            },
          ],
        },
        workspace: {
          connect: {
            id: workspaceId,
          },
        },
      },
    });

    invites.map((item: any) => {
      console.log(item, 'ITEMCHECK');

      try {
        sendMail({
          to: item.email,
          type: MailType.INVITE,
          react: MailInvite({
            inviteLink: `http://localhost:3000/invite/?teamId=${team.id}&email=${item.email}`,
          }),
        });
      } catch (e) {
        console.log('Erorr is here');
      }
    });
    delete req.invites;
  }

  return new Response(JSON.stringify(response));
}

export async function GET(request: Request) {
  const { userId } = auth();

  let response = {};

  try {
    const entry = await prisma.workspace.findMany({
      where: {
        userId: userId || 'example',
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

    const teams = await prisma.team.findMany({
      where: {
        users: {
          some: {
            clerkId: userId || 'example',
          },
        },
      },
      select: {
        workspace: true,
      },
    });

    let teamWorkspaces: any = [];

    teams.map((item) => {
      teamWorkspaces = [...teamWorkspaces, ...item.workspace];
    });

    response = {
      data: [...entry, ...teamWorkspaces],
      status: true,
    };
  } catch (e) {
    response = {
      data: [],
      status: false,
    };
  }

  return new Response(JSON.stringify(response));
}

export async function DELETE(request: Request) {
  const { userId } = auth();

  const queryParams = new URL(request.url).searchParams;

  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  let response = {};

  try {
    const id = queryParams.get('id');

    if (!id) {
      return new Response('Unauthorized', { status: 401 });
    }

    const entry = await prisma.workspace.delete({
      where: {
        id,
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
  }

  return new Response(JSON.stringify(response));
}
