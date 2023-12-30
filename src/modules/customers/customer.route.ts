import { FastifyInstance } from "fastify";
import {
  getCustomersHandler,
  getCustomerByIdHandler,
  createCustomerHandler,
  updateCustomerHandler,
  deleteCustomerHandler,
} from "./customer.controller";
import { $ref } from "./customer.schema";

export const customerRoutes = (server: FastifyInstance) => {
  server.get(
    "/",
    {
      schema: {
        tags: ["Customers"],
        summary: "List all customers",
        response: {
          200: $ref("customersResponseSchema"),
        },
      },
    },
    getCustomersHandler(server),
  );

  server.get(
    "/:id",
    {
      schema: {
        tags: ["Customers"],
        summary: "Get a specific customer",
        params: $ref("requestCustomerByIdParams"),
        response: {
          200: $ref("customerResponseSchema"),
          404: {
            description: "Not Found",
            type: "null",
          },
        },
      },
    },
    getCustomerByIdHandler(server),
  );

  server.post(
    "/",
    {
      schema: {
        tags: ["Customers"],
        summary: "Creates a customer.",
        body: $ref("createCustomerSchema"),
        response: { 201: $ref("createCustomerResponseSchema") },
      },
    },
    createCustomerHandler(server),
  );

  server.put(
    "/:id",
    {
      schema: {
        tags: ["Customers"],
        summary: "Edit a customer",
        params: $ref("requestCustomerByIdParams"),
        body: $ref("updateCustomerSchema"),
        response: {
          200: $ref("updateCustomerResponseSchema"),
          404: {
            description: "Not Found",
            type: "null",
          },
        },
      },
    },
    updateCustomerHandler(server),
  );

  server.delete(
    "/:id",
    {
      schema: {
        tags: ["Customers"],
        summary: "Delete a customer",
        params: $ref("requestCustomerByIdParams"),
        response: {
          204: {
            description: "No Content",
            type: "null",
          },
          404: {
            description: "Not Found",
            type: "null",
          },
        },
      },
    },
    deleteCustomerHandler(server),
  );

  return Promise.resolve();
};
