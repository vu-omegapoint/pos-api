import { FastifyInstance } from "fastify";
import {
  createOrderHandler,
  deleteOrderHandler,
  getOrderByIdHandler,
  getOrdersHandler,
  updateOrderHandler,
} from ".";
import {
  $orderRef,
  createOrderSchema,
  updateOrderSchema,
} from "./order.schema";
import {
  $genericRef,
  preValidationHandler,
  requestByIdParams,
} from "../generic";

export const orderRoutes = (server: FastifyInstance) => {
  server.get(
    "/",
    {
      schema: {
        tags: ["Orders"],
        summary: "List all orders",
        response: {
          200: $orderRef("ordersResponseSchema"),
        },
      },
    },
    getOrdersHandler(server),
  );

  server.get(
    "/:id",
    {
      schema: {
        tags: ["Orders"],
        summary: "Get a specific order",
        params: $genericRef("requestByIdParams"),
        response: {
          200: $orderRef("orderResponseSchema"),
          400: $genericRef("validationErrorResponse"),
          404: $genericRef("errorResponse"),
        },
      },
      preValidation: preValidationHandler(requestByIdParams),
    },
    getOrderByIdHandler(server),
  );

  server.post(
    "/",
    {
      schema: {
        tags: ["Orders"],
        summary: "Creates an order.",
        body: $orderRef("createOrderSchema"),
        response: {
          201: $orderRef("orderResponseSchema"),
          400: $genericRef("validationErrorResponse"),
        },
      },
      preValidation: preValidationHandler(undefined, createOrderSchema),
    },
    createOrderHandler(server),
  );

  server.put(
    "/:id",
    {
      schema: {
        tags: ["Orders"],
        summary: "Edit an order",
        params: $genericRef("requestByIdParams"),
        body: $orderRef("updateOrderSchema"),
        response: {
          200: $orderRef("orderResponseSchema"),
          400: $genericRef("validationErrorResponse"),
          404: $genericRef("errorResponse"),
        },
      },
      preValidation: preValidationHandler(requestByIdParams, updateOrderSchema),
    },
    updateOrderHandler(server),
  );

  server.delete(
    "/:id",
    {
      schema: {
        tags: ["Orders"],
        summary: "Delete an order",
        params: $genericRef("requestByIdParams"),
        response: {
          204: $genericRef("noContentResponse"),
          400: $genericRef("validationErrorResponse"),
          404: $genericRef("errorResponse"),
        },
      },
      preValidation: preValidationHandler(requestByIdParams),
    },
    deleteOrderHandler(server),
  );

  return Promise.resolve();
};
