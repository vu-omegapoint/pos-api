import { FastifyInstance } from "fastify";
import {
  getEmployeesHandler,
  getEmployeeByIdHandler,
  createEmployeeHandler,
  updateEmployeeHandler,
  deleteEmployeeHandler,
  updateEmployeePermissionsHandler,
  updateEmployeeScheduleHandler,
} from "./employee.controller";
import {
  $employeeRef,
  createOrUpdateEmployeeSchema,
  updateEmployeePermissionsSchema,
  updateEmployeeScheduleSchema,
} from "./employee.schema";
import { $genericRef, bodyValidationPreHandler } from "../generic";

export const employeeRoutes = (server: FastifyInstance) => {
  server.get(
    "/",
    {
      schema: {
        tags: ["Employees"],
        summary: "List all employees",
        response: {
          200: $employeeRef("employeesResponseSchema"),
        },
      },
    },
    getEmployeesHandler(server),
  );

  server.get(
    "/:id",
    {
      schema: {
        tags: ["Employees"],
        summary: "Get a specific employee",
        params: $genericRef("requestByIdParams"),
        response: {
          200: $employeeRef("employeeResponseSchema"),
          404: $genericRef("errorResponse"),
        },
      },
    },
    getEmployeeByIdHandler(server),
  );

  server.post(
    "/",
    {
      schema: {
        tags: ["Employees"],
        summary: "Creates an employee.",
        body: $employeeRef("createOrUpdateEmployeeSchema"),
        response: {
          201: $employeeRef("employeeResponseSchema"),
          400: $genericRef("validationErrorResponse"),
        },
      },
      preHandler: bodyValidationPreHandler(createOrUpdateEmployeeSchema),
    },
    createEmployeeHandler(server),
  );

  server.put(
    "/:id",
    {
      schema: {
        tags: ["Employees"],
        summary: "Edit an employee",
        params: $genericRef("requestByIdParams"),
        body: $employeeRef("createOrUpdateEmployeeSchema"),
        response: {
          200: $employeeRef("employeeResponseSchema"),
          400: $genericRef("validationErrorResponse"),
          404: $genericRef("errorResponse"),
        },
      },
      preHandler: bodyValidationPreHandler(createOrUpdateEmployeeSchema),
    },
    updateEmployeeHandler(server),
  );

  server.put(
    "/:id/permissions",
    {
      schema: {
        tags: ["Employees"],
        summary: "Edit employee's permissions",
        params: $genericRef("requestByIdParams"),
        body: $employeeRef("updateEmployeePermissionsSchema"),
        response: {
          200: $employeeRef("updateEmployeePermissionsResponseSchema"),
          400: $genericRef("validationErrorResponse"),
          404: $genericRef("errorResponse"),
        },
      },
      preHandler: bodyValidationPreHandler(updateEmployeePermissionsSchema),
    },
    updateEmployeePermissionsHandler(server),
  );

  server.put(
    "/:id/schedule",
    {
      schema: {
        tags: ["Employees"],
        summary: "Edit employee's schedule",
        params: $genericRef("requestByIdParams"),
        body: $employeeRef("updateEmployeeScheduleSchema"),
        response: {
          200: $employeeRef("updateEmployeeScheduleResponseSchema"),
          400: $genericRef("validationErrorResponse"),
          404: $genericRef("errorResponse"),
        },
      },
      preHandler: bodyValidationPreHandler(updateEmployeeScheduleSchema),
    },
    updateEmployeeScheduleHandler(server),
  );

  server.delete(
    "/:id",
    {
      schema: {
        tags: ["Employees"],
        summary: "Delete an employee",
        params: $genericRef("requestByIdParams"),
        response: {
          204: $genericRef("noContentResponse"),
          404: $genericRef("errorResponse"),
        },
      },
    },
    deleteEmployeeHandler(server),
  );

  return Promise.resolve();
};
