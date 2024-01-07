import { FastifyInstance } from "fastify";
import { CreateOrUpdateItemInput } from ".";

export async function createItem(
  server: FastifyInstance,
  input: CreateOrUpdateItemInput,
) {
  return await server.prisma.item.create({
    data: input,
  });
}

export async function updateItem(
  server: FastifyInstance,
  id: string,
  input: CreateOrUpdateItemInput,
) {
  return await server.prisma.item.update({
    where: { id },
    data: input,
  });
}

export async function deleteItem(server: FastifyInstance, id: string) {
  await server.prisma.item.delete({
    where: { id },
  });
}

export async function findItems(server: FastifyInstance) {
  return await server.prisma.item.findMany();
}

export async function findItemById(server: FastifyInstance, id: string) {
  return await server.prisma.item.findUnique({
    where: { id },
  });
}

export async function checkIfItemExistsById(
  server: FastifyInstance,
  id: string,
) {
  const count = await server.prisma.item.count({
    where: { id },
  });
  return count > 0;
}
