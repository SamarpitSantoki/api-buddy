
import prisma from '@/db/prisma';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.redirect('/404');
  }

  const queryParams = new URL(request.url).searchParams;

  const email = queryParams.get('email') || '';
  const teamId = queryParams.get('teamId') || '';

  if (!email || !teamId) {
    return NextResponse.redirect('/404');
  }

  try {
    let user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user?.clerkId) {
      user = await prisma.user.create({
        data: {
          email,
          clerkId: userId,
        },
      });
    }

    const team = await prisma.team.update({
      where: {
        id: teamId,
      },
      data: {
        users: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    return NextResponse.json({
      status: true,
      data: team,
    });
  } catch (e) {}

  return NextResponse.json({
    status: false,
  });
};