import prisma from '@/db/prisma';
import { User } from '@clerk/nextjs/dist/types/server';

export default function syncUserInDb(user: User) {
  const {
    id,
    firstName,
    lastName,
    emailAddresses,
    username,
    primaryEmailAddressId,
  } = user;

  prisma.user.upsert({
    where: {
      id: id || 'new',
    },
    update: {
      firstName,
      lastName,
      email: emailAddresses[0].emailAddress,
    },
    create: {
      id,
      firstName,
      lastName,
      email:
        emailAddresses.find((email) => email.id === primaryEmailAddressId)
          ?.emailAddress || emailAddresses[0].emailAddress,
    },
  });
}
