import { FastifyInstance } from "fastify";
import { CreateOrderInput, UpdateOrderInput } from ".";

export async function createOrder(
  server: FastifyInstance,
  input: CreateOrderInput,
) {
  return await server.prisma.order.create({
    data: input, // TODO: fix
  });
}

export async function updateOrder(
  server: FastifyInstance,
  id: string,
  input: UpdateOrderInput,
) {
  return await server.prisma.order.update({
    where: { id },
    data: input, // TODO: fix
  });
}

export async function deleteOrder(server: FastifyInstance, id: string) {
  await server.prisma.order.delete({
    where: { id },
  });
}

export async function findOrders(server: FastifyInstance) {
  return await server.prisma.order.findMany();
}

export async function findOrderById(server: FastifyInstance, id: string) {
  return await server.prisma.order.findUnique({
    where: { id },
  });
}

export async function checkIfOrderExistsById(
  server: FastifyInstance,
  id: string,
) {
  const count = await server.prisma.order.count({
    where: { id },
  });
  return count > 0;
}
