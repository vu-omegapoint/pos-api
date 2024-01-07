import { FastifyInstance } from "fastify";
import {
  createItemHandler,
  deleteItemHandler,
  getItemByIdHandler,
  getItemsHandler,
  updateItemHandler,
} from ".";
import { $itemRef } from "./item.schema";
import { $genericRef } from "../generic";

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
          404: $genericRef("errorResponse"),
        },
      },
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
        response: { 201: $itemRef("itemResponseSchema") },
      },
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
          404: $genericRef("errorResponse"),
        },
      },
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
          404: $genericRef("errorResponse"),
        },
      },
    },
    deleteItemHandler(server),
  );

  return Promise.resolve();
};
