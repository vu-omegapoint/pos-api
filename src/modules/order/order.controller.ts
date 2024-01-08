import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import {
  cancelOrder,
  checkIfOrderExistsById,
  createOrder,
  deleteOrder,
  findOrderById,
  findOrders,
  updateOrder,
} from "./order.service";
import { CreateOrUpdateOrderInput } from ".";
import { RequestByIdParams } from "../generic";

export const getOrdersHandler =
  (server: FastifyInstance) =>
  async (_request: FastifyRequest, reply: FastifyReply) => {
    const orders = await findOrders(server);
    return reply.code(200).send(orders);
  };

export const getOrderByIdHandler =
  (server: FastifyInstance) =>
  async (
    request: FastifyRequest<{ Params: RequestByIdParams }>,
    reply: FastifyReply,
  ) => {
    const { params } = request;
    const order = await findOrderById(server, params.id);
    if (!order)
      return reply
        .code(404)
        .send({ message: `Order '${params.id}' was not found` });

    return reply.code(200).send(order);
  };

export const createOrderHandler =
  (server: FastifyInstance) =>
  async (
    request: FastifyRequest<{ Body: CreateOrUpdateOrderInput }>,
    reply: FastifyReply,
  ) => {
    const { body } = request;
    const order = await createOrder(server, body);
    return reply.code(201).send(order);
  };

export const updateOrderHandler =
  (server: FastifyInstance) =>
  async (
    request: FastifyRequest<{
      Body: CreateOrUpdateOrderInput;
      Params: RequestByIdParams;
    }>,
    reply: FastifyReply,
  ) => {
    const { body, params } = request;
    const orderExists = await checkIfOrderExistsById(server, params.id);
    if (!orderExists)
      return reply
        .code(404)
        .send({ message: `Order '${params.id}' was not found` });

    const order = await updateOrder(server, params.id, body);
    return reply.code(200).send(order);
  };

export const cancelOrderHandler =
  (server: FastifyInstance) =>
  async (
    request: FastifyRequest<{ Params: RequestByIdParams }>,
    reply: FastifyReply,
  ) => {
    const { params } = request;
    const orderExists = await checkIfOrderExistsById(server, params.id);
    if (!orderExists)
      return reply
        .code(404)
        .send({ message: `Order '${params.id}' was not found` });

    await cancelOrder(server, params.id);
    return reply.code(204).send();
  };

export const deleteOrderHandler =
  (server: FastifyInstance) =>
  async (
    request: FastifyRequest<{ Params: RequestByIdParams }>,
    reply: FastifyReply,
  ) => {
    const { params } = request;
    const orderExists = await checkIfOrderExistsById(server, params.id);
    if (!orderExists)
      return reply
        .code(404)
        .send({ message: `Order '${params.id}' was not found` });

    await deleteOrder(server, params.id);
    return reply.code(204).send();
  };
