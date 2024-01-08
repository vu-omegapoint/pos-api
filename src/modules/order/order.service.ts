import { FastifyInstance } from "fastify";
import { OrderStatus, CreateOrUpdateOrderInput } from ".";

export async function createOrder(
  server: FastifyInstance,
  input: CreateOrUpdateOrderInput,
) {
  return await server.prisma.order.create({
    data: {
      items: {
        create: input.items.map((x) => ({
          quantity: x.quantity,
          itemId: x.id,
          employeeId: x.employeeId,
        })),
      },
      services: {
        create: input.services.map((x) => ({
          startTime: x.startTime,
          serviceId: x.id,
          employeeId: x.employeeId,
        })),
      },
      customerId: input.customerId,
      notes: input.notes,
      status: OrderStatus.pending,
    },
    include: { items: true, services: true },
  });
}

export async function updateOrder(
  server: FastifyInstance,
  id: string,
  input: CreateOrUpdateOrderInput,
) {
  return await server.prisma.order.update({
    where: { id },
    data: {
      items: {
        deleteMany: { id },
        create: input.items.map((x) => ({
          quantity: x.quantity,
          itemId: x.id,
          employeeId: x.employeeId,
        })),
      },
      services: {
        deleteMany: { id },
        create: input.services.map((x) => ({
          startTime: x.startTime,
          serviceId: x.id,
          employeeId: x.employeeId,
        })),
      },
      customerId: input.customerId,
      notes: input.notes,
    },
    include: { items: true, services: true },
  });
}

export async function cancelOrder(server: FastifyInstance, id: string) {
  await server.prisma.order.update({
    where: { id },
    data: { status: OrderStatus.cancelled },
  });
}

export async function completeOrder(server: FastifyInstance, id: string) {
  await server.prisma.order.update({
    where: { id },
    data: { status: OrderStatus.completed },
  });
}

export async function deleteOrder(server: FastifyInstance, id: string) {
  await server.prisma.order.delete({
    where: { id },
  });
}

export async function findOrders(server: FastifyInstance) {
  return await server.prisma.order.findMany({
    include: { items: true, services: true },
  });
}

export async function findOrderById(server: FastifyInstance, id: string) {
  return await server.prisma.order.findUnique({
    where: { id },
    include: { items: true, services: true },
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
