import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import {
  checkIfServiceExistsById,
  createService,
  deleteService,
  findServiceById,
  findServices,
  updateService,
} from "./service.service";
import { CreateOrUpdateServiceInput } from ".";
import { RequestByIdParams } from "../generic";

export const getServicesHandler =
  (server: FastifyInstance) =>
  async (_request: FastifyRequest, reply: FastifyReply) => {
    const services = await findServices(server);
    return reply.code(200).send(services);
  };

export const getServiceByIdHandler =
  (server: FastifyInstance) =>
  async (
    request: FastifyRequest<{ Params: RequestByIdParams }>,
    reply: FastifyReply,
  ) => {
    const { params } = request;
    const service = await findServiceById(server, params.id);
    if (!service)
      return reply
        .code(404)
        .send({ message: `Service '${params.id}' was not found` });

    return reply.code(200).send(service);
  };

export const createServiceHandler =
  (server: FastifyInstance) =>
  async (
    request: FastifyRequest<{ Body: CreateOrUpdateServiceInput }>,
    reply: FastifyReply,
  ) => {
    const { body } = request;
    const service = await createService(server, body);
    return reply.code(201).send(service);
  };

export const updateServiceHandler =
  (server: FastifyInstance) =>
  async (
    request: FastifyRequest<{
      Body: CreateOrUpdateServiceInput;
      Params: RequestByIdParams;
    }>,
    reply: FastifyReply,
  ) => {
    const { body, params } = request;
    const serviceExists = await checkIfServiceExistsById(server, params.id);
    if (!serviceExists)
      return reply
        .code(404)
        .send({ message: `Service '${params.id}' was not found` });

    const service = await updateService(server, params.id, body);
    return reply.code(200).send(service);
  };

export const deleteServiceHandler =
  (server: FastifyInstance) =>
  async (
    request: FastifyRequest<{ Params: RequestByIdParams }>,
    reply: FastifyReply,
  ) => {
    const { params } = request;
    const serviceExists = await checkIfServiceExistsById(server, params.id);
    if (!serviceExists)
      return reply
        .code(404)
        .send({ message: `Service '${params.id}' was not found` });

    await deleteService(server, params.id);
    return reply.code(204).send();
  };
