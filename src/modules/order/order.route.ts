import { FastifyInstance } from "fastify";
import {
  cancelOrderHandler,
  createOrderHandler,
  deleteOrderHandler,
  getOrderByIdHandler,
  getOrdersHandler,
  updateOrderHandler,
} from ".";
import { $orderRef, createOrUpdateOrderSchema } from "./order.schema";
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
        body: $orderRef("createOrUpdateOrderSchema"),
        response: {
          201: $orderRef("orderResponseSchema"),
          400: $genericRef("validationErrorResponse"),
        },
      },
      preValidation: preValidationHandler(undefined, createOrUpdateOrderSchema),
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
        body: $orderRef("createOrUpdateOrderSchema"),
        response: {
          200: $orderRef("orderResponseSchema"),
          400: $genericRef("validationErrorResponse"),
          404: $genericRef("errorResponse"),
        },
      },
      preValidation: preValidationHandler(
        requestByIdParams,
        createOrUpdateOrderSchema,
      ),
    },
    updateOrderHandler(server),
  );

  server.put(
    "/:id/cancel",
    {
      schema: {
        tags: ["Orders"],
        summary: "Cancel an order",
        params: $genericRef("requestByIdParams"),
        response: {
          204: $genericRef("noContentResponse"),
          400: $genericRef("validationErrorResponse"),
          404: $genericRef("errorResponse"),
        },
      },
      preValidation: preValidationHandler(requestByIdParams),
    },
    cancelOrderHandler(server),
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
