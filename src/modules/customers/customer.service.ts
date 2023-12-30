import { FastifyInstance } from "fastify";
import { CreateCustomerInput, UpdateCustomerInput } from "./customer.schema";

export async function createCustomer(
  server: FastifyInstance,
  input: CreateCustomerInput,
) {
  return await server.prisma.customer.create({
    data: {
      name: input.name,
      contactInfo: { create: input.contactInfo },
      address: { create: input.address },
    },
    select: {
      id: true,
      name: true,
      contactInfo: true,
      address: true,
    },
  });
}

export async function updateCustomer(
  server: FastifyInstance,
  id: string,
  input: UpdateCustomerInput,
) {
  return await server.prisma.customer.update({
    where: { id },
    data: {
      name: input.name,
      contactInfo: { update: input.contactInfo },
      address: { update: input.address },
    },
    select: {
      id: true,
      name: true,
      contactInfo: true,
      address: true,
    },
  });
}

export async function deleteCustomer(server: FastifyInstance, id: string) {
  await server.prisma.customer.delete({
    where: { id },
  });
}

export async function findCustomerById(server: FastifyInstance, id: string) {
  return await server.prisma.customer.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      contactInfo: true,
      address: true,
    },
  });
}

export async function findCustomers(server: FastifyInstance) {
  return await server.prisma.customer.findMany({
    select: {
      id: true,
      name: true,
      contactInfo: true,
      address: true,
    },
  });
}

export async function checkIfCustomerExistsById(
  server: FastifyInstance,
  id: string,
) {
  const count = await server.prisma.customer.count({
    where: { id },
  });
  return count > 0;
}
