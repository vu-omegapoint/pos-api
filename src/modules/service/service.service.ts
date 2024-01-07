import { FastifyInstance } from "fastify";
import { CreateOrUpdateServiceInput } from "./service.schema";

export async function createService(
  server: FastifyInstance,
  input: CreateOrUpdateServiceInput,
) {
  return await server.prisma.service.create({
    data: input,
  });
}

export async function updateService(
  server: FastifyInstance,
  id: string,
  input: CreateOrUpdateServiceInput,
) {
  return await server.prisma.service.update({
    where: { id },
    data: input,
  });
}

export async function deleteService(server: FastifyInstance, id: string) {
  await server.prisma.service.delete({
    where: { id },
  });
}

export async function findServices(server: FastifyInstance) {
  return await server.prisma.service.findMany();
}

export async function findServiceById(server: FastifyInstance, id: string) {
  return await server.prisma.service.findUnique({
    where: { id },
  });
}

export async function checkIfServiceExistsById(
  server: FastifyInstance,
  id: string,
) {
  const count = await server.prisma.service.count({
    where: { id },
  });
  return count > 0;
}
