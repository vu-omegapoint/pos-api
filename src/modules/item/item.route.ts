import { FastifyInstance } from "fastify";
import {
  createItemHandler,
  deleteItemHandler,
  getItemByIdHandler,
  getItemsHandler,
  updateItemHandler,
} from ".";
import { $itemRef, createOrUpdateItemSchema } from "./item.schema";
import {
  $genericRef,
  preValidationHandler,
  requestByIdParams,
} from "../generic";

export const itemRoutes = (server: FastifyInstance) => {
  server.get(
    "/",
    {
      schema: {
        tags: ["Items"],
        summary: "List all items",
        response: {
          200: $itemRef("itemsResponseSchema"),
        },
      },
    },
    getItemsHandler(server),
  );

  server.get(
    "/:id",
    {
      schema: {
        tags: ["Items"],
        summary: "Get a specific item",
        params: $genericRef("requestByIdParams"),
        response: {
          200: $itemRef("itemResponseSchema"),
          400: $genericRef("validationErrorResponse"),
          404: $genericRef("errorResponse"),
        },
      },
      preValidation: preValidationHandler(requestByIdParams),
    },
    getItemByIdHandler(server),
  );

  server.post(
    "/",
    {
      schema: {
        tags: ["Items"],
        summary: "Creates an item.",
        body: $itemRef("createOrUpdateItemSchema"),
        response: {
          201: $itemRef("itemResponseSchema"),
          400: $genericRef("validationErrorResponse"),
        },
      },
      preValidation: preValidationHandler(undefined, createOrUpdateItemSchema),
    },
    createItemHandler(server),
  );

  server.put(
    "/:id",
    {
      schema: {
        tags: ["Items"],
        summary: "Edit an item",
        params: $genericRef("requestByIdParams"),
        body: $itemRef("createOrUpdateItemSchema"),
        response: {
          200: $itemRef("itemResponseSchema"),
          400: $genericRef("validationErrorResponse"),
          404: $genericRef("errorResponse"),
        },
      },
      preValidation: preValidationHandler(
        requestByIdParams,
        createOrUpdateItemSchema,
      ),
    },
    updateItemHandler(server),
  );

  server.delete(
    "/:id",
    {
      schema: {
        tags: ["Items"],
        summary: "Delete an item",
        params: $genericRef("requestByIdParams"),
        response: {
          204: $genericRef("noContentResponse"),
          400: $genericRef("validationErrorResponse"),
          404: $genericRef("errorResponse"),
        },
      },
      preValidation: preValidationHandler(requestByIdParams),
    },
    deleteItemHandler(server),
  );

  return Promise.resolve();
};
