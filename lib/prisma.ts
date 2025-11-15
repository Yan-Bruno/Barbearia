// lib/prisma.ts

import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = global as unknown as { prisma: ReturnType<typeof createPrismaClient> };

function createPrismaClient() {
  const client = new PrismaClient();
  
  return client.$extends({
    query: {
      $allModels: {
        async create({ args, query }) {
          if (args.data && typeof args.data === 'object' && 'id' in args.data) {
            const id = args.data.id;
            if (typeof id === 'string' && !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
              const { id: _, ...rest } = args.data;
              args.data = rest;
            }
          }
          return query(args);
        },
      },
    },
  });
}

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
