import fp from "fastify-plugin";
import { PrismaClient } from "@prisma/client";

// Use TypeScript module augmentation to declare the type of server.prisma to be PrismaClient.
// This is the suggested way at https://www.prisma.io/fastify.
declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

export default fp(async (fastify) => {
  const prisma = new PrismaClient({ log: ["error", "warn"] });

  await prisma.$connect();

  // Make Prisma Client available through the fastify server instance: server.prisma
  fastify.decorate("prisma", prisma);

  fastify.addHook("onClose", async (server) => {
    await server.prisma.$disconnect();
  });
});
