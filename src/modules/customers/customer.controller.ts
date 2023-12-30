import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {
  CreateCustomerInput,
  RequestCustomerByIdParams,
  UpdateCustomerInput,
} from "./customer.schema";
import {
  createCustomer,
  checkIfCustomerExistsById,
  deleteCustomer,
  findCustomerById,
  findCustomers,
  updateCustomer,
} from "./customer.service";

export const getCustomersHandler =
  (server: FastifyInstance) =>
  async (_request: FastifyRequest, reply: FastifyReply) => {
    try {
      const customers = await findCustomers(server);
      return reply.code(200).send(customers);
    } catch (e) {
      server.log.error(e);
      return reply.code(500).send(e);
    }
  };

export const getCustomerByIdHandler =
  (server: FastifyInstance) =>
  async (
    request: FastifyRequest<{ Params: RequestCustomerByIdParams }>,
    reply: FastifyReply,
  ) => {
    const { params } = request;
    try {
      const customer = await findCustomerById(server, params.id);
      if (!customer)
        return reply
          .code(404)
          .send({ message: `Customer '${params.id}' was not found` });

      return reply.code(200).send(customer);
    } catch (e) {
      server.log.error(e);
      return reply.code(500).send(e);
    }
  };

export const createCustomerHandler =
  (server: FastifyInstance) =>
  async (
    request: FastifyRequest<{ Body: CreateCustomerInput }>,
    reply: FastifyReply,
  ) => {
    const { body } = request;
    try {
      const customer = await createCustomer(server, body);
      return reply.code(201).send(customer);
    } catch (e) {
      server.log.error(e);
      return reply.code(500).send(e);
    }
  };

export const updateCustomerHandler =
  (server: FastifyInstance) =>
  async (
    request: FastifyRequest<{
      Body: UpdateCustomerInput;
      Params: RequestCustomerByIdParams;
    }>,
    reply: FastifyReply,
  ) => {
    const { body, params } = request;
    try {
      const customerExists = await checkIfCustomerExistsById(server, params.id);
      if (!customerExists)
        return reply
          .code(404)
          .send({ message: `Customer '${params.id}' was not found` });

      const customer = await updateCustomer(server, params.id, body);
      return reply.code(200).send(customer);
    } catch (e) {
      server.log.error(e);
      return reply.code(500).send(e);
    }
  };

export const deleteCustomerHandler =
  (server: FastifyInstance) =>
  async (
    request: FastifyRequest<{ Params: RequestCustomerByIdParams }>,
    reply: FastifyReply,
  ) => {
    const { params } = request;
    try {
      const customerExists = await checkIfCustomerExistsById(server, params.id);
      if (!customerExists)
        return reply
          .code(404)
          .send({ message: `Customer '${params.id}' was not found` });

      await deleteCustomer(server, params.id);
      return reply.code(204).send();
    } catch (e) {
      server.log.error(e);
      return reply.code(500).send(e);
    }
  };
