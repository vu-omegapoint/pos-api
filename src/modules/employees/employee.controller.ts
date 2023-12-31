import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {
  CreateOrUpdateEmployeeInput,
  UpdateEmployeePermissionsInput,
  UpdateEmployeeScheduleInput,
} from "./employee.schema";
import {
  createEmployee,
  checkIfEmployeeExistsById,
  deleteEmployee,
  findEmployeeById,
  findEmployees,
  updateEmployee,
  updateEmployeePermissions,
  updateEmployeeSchedule,
} from "./employee.service";
import { RequestByIdParams } from "../generic";

export const getEmployeesHandler =
  (server: FastifyInstance) =>
  async (_request: FastifyRequest, reply: FastifyReply) => {
    const employees = await findEmployees(server);
    return reply.code(200).send(employees);
  };

export const getEmployeeByIdHandler =
  (server: FastifyInstance) =>
  async (
    request: FastifyRequest<{ Params: RequestByIdParams }>,
    reply: FastifyReply,
  ) => {
    const { params } = request;
    const employee = await findEmployeeById(server, params.id);
    if (!employee)
      return reply
        .code(404)
        .send({ message: `Employee '${params.id}' was not found` });

    return reply.code(200).send(employee);
  };

export const createEmployeeHandler =
  (server: FastifyInstance) =>
  async (
    request: FastifyRequest<{ Body: CreateOrUpdateEmployeeInput }>,
    reply: FastifyReply,
  ) => {
    const { body } = request;
    const employee = await createEmployee(server, body);
    return reply.code(201).send(employee);
  };

export const updateEmployeeHandler =
  (server: FastifyInstance) =>
  async (
    request: FastifyRequest<{
      Body: CreateOrUpdateEmployeeInput;
      Params: RequestByIdParams;
    }>,
    reply: FastifyReply,
  ) => {
    const { body, params } = request;
    const employeeExists = await checkIfEmployeeExistsById(server, params.id);
    if (!employeeExists)
      return reply
        .code(404)
        .send({ message: `Employee '${params.id}' was not found` });

    const employee = await updateEmployee(server, params.id, body);
    return reply.code(200).send(employee);
  };

export const updateEmployeePermissionsHandler =
  (server: FastifyInstance) =>
  async (
    request: FastifyRequest<{
      Body: UpdateEmployeePermissionsInput;
      Params: RequestByIdParams;
    }>,
    reply: FastifyReply,
  ) => {
    const { body, params } = request;
    const employeeExists = await checkIfEmployeeExistsById(server, params.id);
    if (!employeeExists)
      return reply
        .code(404)
        .send({ message: `Employee '${params.id}' was not found` });

    const employee = await updateEmployeePermissions(server, params.id, body);
    return reply.code(200).send(employee);
  };

export const updateEmployeeScheduleHandler =
  (server: FastifyInstance) =>
  async (
    request: FastifyRequest<{
      Body: UpdateEmployeeScheduleInput;
      Params: RequestByIdParams;
    }>,
    reply: FastifyReply,
  ) => {
    const { body, params } = request;
    const employeeExists = await checkIfEmployeeExistsById(server, params.id);
    if (!employeeExists)
      return reply
        .code(404)
        .send({ message: `Employee '${params.id}' was not found` });

    const employee = await updateEmployeeSchedule(server, params.id, body);
    return reply.code(200).send(employee);
  };

export const deleteEmployeeHandler =
  (server: FastifyInstance) =>
  async (
    request: FastifyRequest<{ Params: RequestByIdParams }>,
    reply: FastifyReply,
  ) => {
    const { params } = request;
    const employeeExists = await checkIfEmployeeExistsById(server, params.id);
    if (!employeeExists)
      return reply
        .code(404)
        .send({ message: `Employee '${params.id}' was not found` });

    await deleteEmployee(server, params.id);
    return reply.code(204).send();
  };
