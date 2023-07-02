import prisma from '@/db/prisma';
import { User } from '@clerk/nextjs/dist/types/server';

export default async function syncUserInDb(user: User) {
  const { id, firstName, lastName, emailAddresses, primaryEmailAddressId } =
    user;

  await prisma.user.upsert({
    where: {
      email:
        emailAddresses.find((email) => email.id === primaryEmailAddressId)
          ?.emailAddress || emailAddresses[0].emailAddress,
    },
    update: {
      firstName,
      lastName,
      email: emailAddresses[0].emailAddress,
    },
    create: {
      clerkId: id,
      firstName,
      lastName,
      email:
        emailAddresses.find((email) => email.id === primaryEmailAddressId)
          ?.emailAddress || emailAddresses[0].emailAddress,
    },
  });
}
