import { FastifyInstance } from "fastify";
import {
  getCustomersHandler,
  getCustomerByIdHandler,
  createCustomerHandler,
  updateCustomerHandler,
  deleteCustomerHandler,
} from "./customer.controller";
import { $customerRef, createOrUpdateCustomerSchema } from "./customer.schema";
import {
  $genericRef,
  preValidationHandler,
  requestByIdParams,
} from "../generic";

export const customerRoutes = (server: FastifyInstance) => {
  server.get(
    "/",
    {
      schema: {
        tags: ["Customers"],
        summary: "List all customers",
        response: {
          200: $customerRef("customersResponseSchema"),
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
        params: $genericRef("requestByIdParams"),
        response: {
          200: $customerRef("customerResponseSchema"),
          404: $genericRef("errorResponse"),
        },
      },
      preValidation: preValidationHandler(requestByIdParams),
    },
    getCustomerByIdHandler(server),
  );

  server.post(
    "/",
    {
      schema: {
        tags: ["Customers"],
        summary: "Creates a customer.",
        body: $customerRef("createOrUpdateCustomerSchema"),
        response: { 201: $customerRef("customerResponseSchema") },
      },
      preValidation: preValidationHandler(
        undefined,
        createOrUpdateCustomerSchema,
      ),
    },
    createCustomerHandler(server),
  );

  server.put(
    "/:id",
    {
      schema: {
        tags: ["Customers"],
        summary: "Edit a customer",
        params: $genericRef("requestByIdParams"),
        body: $customerRef("createOrUpdateCustomerSchema"),
        response: {
          200: $customerRef("customerResponseSchema"),
          404: $genericRef("errorResponse"),
        },
      },
      preValidation: preValidationHandler(
        requestByIdParams,
        createOrUpdateCustomerSchema,
      ),
    },
    updateCustomerHandler(server),
  );

  server.delete(
    "/:id",
    {
      schema: {
        tags: ["Customers"],
        summary: "Delete a customer",
        params: $genericRef("requestByIdParams"),
        response: {
          204: $genericRef("noContentResponse"),
          404: $genericRef("errorResponse"),
        },
      },
      preValidation: preValidationHandler(requestByIdParams),
    },
    deleteCustomerHandler(server),
  );

  return Promise.resolve();
};
