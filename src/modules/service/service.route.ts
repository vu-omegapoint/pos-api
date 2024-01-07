import { FastifyInstance } from "fastify";
import {
  createServiceHandler,
  deleteServiceHandler,
  getServiceByIdHandler,
  getServicesHandler,
  updateServiceHandler,
} from ".";
import { $serviceRef, createOrUpdateServiceSchema } from "./service.schema";
import {
  $genericRef,
  preValidationHandler,
  requestByIdParams,
} from "../generic";

export const serviceRoutes = (server: FastifyInstance) => {
  server.get(
    "/",
    {
      schema: {
        tags: ["Services"],
        summary: "List all services",
        response: {
          200: $serviceRef("servicesResponseSchema"),
        },
      },
    },
    getServicesHandler(server),
  );

  server.get(
    "/:id",
    {
      schema: {
        tags: ["Services"],
        summary: "Get a specific service",
        params: $genericRef("requestByIdParams"),
        response: {
          200: $serviceRef("serviceResponseSchema"),
          400: $genericRef("validationErrorResponse"),
          404: $genericRef("errorResponse"),
        },
      },
      preValidation: preValidationHandler(requestByIdParams),
    },
    getServiceByIdHandler(server),
  );

  server.post(
    "/",
    {
      schema: {
        tags: ["Services"],
        summary: "Creates an service.",
        body: $serviceRef("createOrUpdateServiceSchema"),
        response: {
          201: $serviceRef("serviceResponseSchema"),
          400: $genericRef("validationErrorResponse"),
        },
      },
      preValidation: preValidationHandler(
        undefined,
        createOrUpdateServiceSchema,
      ),
    },
    createServiceHandler(server),
  );

  server.put(
    "/:id",
    {
      schema: {
        tags: ["Services"],
        summary: "Edit an service",
        params: $genericRef("requestByIdParams"),
        body: $serviceRef("createOrUpdateServiceSchema"),
        response: {
          200: $serviceRef("serviceResponseSchema"),
          400: $genericRef("validationErrorResponse"),
          404: $genericRef("errorResponse"),
        },
      },
      preValidation: preValidationHandler(
        requestByIdParams,
        createOrUpdateServiceSchema,
      ),
    },
    updateServiceHandler(server),
  );

  server.delete(
    "/:id",
    {
      schema: {
        tags: ["Services"],
        summary: "Delete an service",
        params: $genericRef("requestByIdParams"),
        response: {
          204: $genericRef("noContentResponse"),
          400: $genericRef("validationErrorResponse"),
          404: $genericRef("errorResponse"),
        },
      },
      preValidation: preValidationHandler(requestByIdParams),
    },
    deleteServiceHandler(server),
  );

  return Promise.resolve();
};
