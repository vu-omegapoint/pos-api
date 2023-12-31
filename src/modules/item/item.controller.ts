import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import {
  checkIfItemExistsById,
  createItem,
  deleteItem,
  findItemById,
  findItems,
  updateItem,
} from "./item.service";
import { CreateOrUpdateItemInput } from ".";
import { RequestByIdParams } from "../generic";

export const getItemsHandler =
  (server: FastifyInstance) =>
  async (_request: FastifyRequest, reply: FastifyReply) => {
    const items = await findItems(server);
    return reply.code(200).send(items);
  };

export const getItemByIdHandler =
  (server: FastifyInstance) =>
  async (
    request: FastifyRequest<{ Params: RequestByIdParams }>,
    reply: FastifyReply,
  ) => {
    const { params } = request;
    const item = await findItemById(server, params.id);
    if (!item)
      return reply
        .code(404)
        .send({ message: `Item '${params.id}' was not found` });

    return reply.code(200).send(item);
  };

export const createItemHandler =
  (server: FastifyInstance) =>
  async (
    request: FastifyRequest<{ Body: CreateOrUpdateItemInput }>,
    reply: FastifyReply,
  ) => {
    const { body } = request;
    const item = await createItem(server, body);
    return reply.code(201).send(item);
  };

export const updateItemHandler =
  (server: FastifyInstance) =>
  async (
    request: FastifyRequest<{
      Body: CreateOrUpdateItemInput;
      Params: RequestByIdParams;
    }>,
    reply: FastifyReply,
  ) => {
    const { body, params } = request;
    const itemExists = await checkIfItemExistsById(server, params.id);
    if (!itemExists)
      return reply
        .code(404)
        .send({ message: `Item '${params.id}' was not found` });

    const item = await updateItem(server, params.id, body);
    return reply.code(200).send(item);
  };

export const deleteItemHandler =
  (server: FastifyInstance) =>
  async (
    request: FastifyRequest<{ Params: RequestByIdParams }>,
    reply: FastifyReply,
  ) => {
    const { params } = request;
    const itemExists = await checkIfItemExistsById(server, params.id);
    if (!itemExists)
      return reply
        .code(404)
        .send({ message: `Item '${params.id}' was not found` });

    await deleteItem(server, params.id);
    return reply.code(204).send();
  };
