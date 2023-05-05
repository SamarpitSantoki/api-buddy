// initiate prisma client and make sure only one instance is created

import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

type Global = typeof globalThis & {
  prisma: PrismaClient;
};

declare const global: Global;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
