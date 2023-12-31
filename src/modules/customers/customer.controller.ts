import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreateOrUpdateCustomerInput } from "./customer.schema";
import {
  createCustomer,
  checkIfCustomerExistsById,
  deleteCustomer,
  findCustomerById,
  findCustomers,
  updateCustomer,
} from "./customer.service";
import { RequestByIdParams } from "../generic";

export const getCustomersHandler =
  (server: FastifyInstance) =>
  async (_request: FastifyRequest, reply: FastifyReply) => {
    const customers = await findCustomers(server);
    return reply.code(200).send(customers);
  };

export const getCustomerByIdHandler =
  (server: FastifyInstance) =>
  async (
    request: FastifyRequest<{ Params: RequestByIdParams }>,
    reply: FastifyReply,
  ) => {
    const { params } = request;
    const customer = await findCustomerById(server, params.id);
    if (!customer)
      return reply
        .code(404)
        .send({ message: `Customer '${params.id}' was not found` });

    return reply.code(200).send(customer);
  };

export const createCustomerHandler =
  (server: FastifyInstance) =>
  async (
    request: FastifyRequest<{ Body: CreateOrUpdateCustomerInput }>,
    reply: FastifyReply,
  ) => {
    const { body } = request;
    const customer = await createCustomer(server, body);
    return reply.code(201).send(customer);
  };

export const updateCustomerHandler =
  (server: FastifyInstance) =>
  async (
    request: FastifyRequest<{
      Body: CreateOrUpdateCustomerInput;
      Params: RequestByIdParams;
    }>,
    reply: FastifyReply,
  ) => {
    const { body, params } = request;
    const customerExists = await checkIfCustomerExistsById(server, params.id);
    if (!customerExists)
      return reply
        .code(404)
        .send({ message: `Customer '${params.id}' was not found` });

    const customer = await updateCustomer(server, params.id, body);
    return reply.code(200).send(customer);
  };

export const deleteCustomerHandler =
  (server: FastifyInstance) =>
  async (
    request: FastifyRequest<{ Params: RequestByIdParams }>,
    reply: FastifyReply,
  ) => {
    const { params } = request;
    const customerExists = await checkIfCustomerExistsById(server, params.id);
    if (!customerExists)
      return reply
        .code(404)
        .send({ message: `Customer '${params.id}' was not found` });

    await deleteCustomer(server, params.id);
    return reply.code(204).send();
  };
