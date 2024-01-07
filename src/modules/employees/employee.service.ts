import { FastifyInstance } from "fastify";
import {
  CreateOrUpdateEmployeeInput,
  UpdateEmployeePermissionsInput,
  UpdateEmployeeScheduleInput,
} from "./employee.schema";

export async function createEmployee(
  server: FastifyInstance,
  input: CreateOrUpdateEmployeeInput,
) {
  return await server.prisma.employee.create({
    data: {
      name: input.name,
      permissions: { create: input.permissions },
      schedule: { create: input.schedule },
    },
    select: {
      id: true,
      name: true,
      permissions: true,
      schedule: true,
    },
  });
}

export async function updateEmployee(
  server: FastifyInstance,
  id: string,
  input: CreateOrUpdateEmployeeInput,
) {
  return await server.prisma.employee.update({
    where: { id },
    data: {
      name: input.name,
      permissions: {
        deleteMany: { employeeId: id },
        create: input.permissions,
      },
      schedule: {
        deleteMany: { employeeId: id },
        create: input.schedule,
      },
    },
    select: {
      id: true,
      name: true,
      permissions: true,
      schedule: true,
    },
  });
}

export async function updateEmployeePermissions(
  server: FastifyInstance,
  id: string,
  input: UpdateEmployeePermissionsInput,
) {
  return await server.prisma.employee.update({
    where: { id },
    data: {
      permissions: {
        deleteMany: { employeeId: id },
        create: input.permissions,
      },
    },
    select: { id: true, permissions: true },
  });
}

export async function updateEmployeeSchedule(
  server: FastifyInstance,
  id: string,
  input: UpdateEmployeeScheduleInput,
) {
  return await server.prisma.employee.update({
    where: { id },
    data: {
      schedule: {
        deleteMany: { employeeId: id },
        create: input.schedule,
      },
    },
    select: { id: true, schedule: true },
  });
}

export async function deleteEmployee(server: FastifyInstance, id: string) {
  await server.prisma.employee.delete({
    where: { id },
  });
}

export async function findEmployeeById(server: FastifyInstance, id: string) {
  return await server.prisma.employee.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      permissions: true,
      schedule: true,
    },
  });
}

export async function findEmployees(server: FastifyInstance) {
  return await server.prisma.employee.findMany({
    select: {
      id: true,
      name: true,
      permissions: true,
      schedule: true,
    },
  });
}

export async function checkIfEmployeeExistsById(
  server: FastifyInstance,
  id: string,
) {
  const count = await server.prisma.employee.count({ where: { id } });
  return count > 0;
}
