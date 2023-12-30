import { FastifyPluginAsync } from "fastify";
import { Endpoints } from "../constants";
import { Prisma } from "@prisma/client";
import { RequestByIdParams } from "../types";

const customers: FastifyPluginAsync = (server) => {
  server.get(
    Endpoints.customers,
    {
      schema: {
        tags: ["Customers"],
        summary: "List all customers",
        response: {
          200: {
            description: "OK",
            type: "array",
            items: {
              type: "object",
              $ref: "customer#",
            },
          },
        },
        security: [],
      },
    },
    async (_req, res) => {
      const customers = await server.prisma.customer.findMany();
      return res.status(200).send(customers);
    },
  );

  server.get<RequestByIdParams>(
    `${Endpoints.customers}/:id`,
    {
      schema: {
        tags: ["Customers"],
        summary: "Get a specific customer",
        params: { $ref: "requestByIdParams#" },
        response: {
          200: {
            description: "OK",
            type: "object",
            $ref: "customer#",
          },
          404: {
            description: "Not Found",
            type: "null",
          },
        },
        security: [],
      },
    },
    async ({ params: { id } }, res) => {
      const customer = await server.prisma.customer.findUnique({
        where: { id },
      });
      if (!customer) return res.status(404).send();
      return res.status(200).send(customer);
    },
  );

  server.post<{ Body: Prisma.CustomerCreateInput }>(
    Endpoints.customers,
    {
      schema: {
        tags: ["Customers"],
        summary: "Creates a customer.",
        body: {
          type: "object",
          $ref: "customer#",
        },
        response: {
          201: {
            description: "Created",
            type: "object",
            $ref: "customer#",
          },
        },
        security: [],
      },
    },
    async (req, res) => {
      const customer = await server.prisma.customer.create({
        data: req.body,
      });
      return res.status(201).send(customer);
    },
  );

  server.put<RequestByIdParams & { Body: Prisma.CustomerUpdateInput }>(
    `${Endpoints.customers}/:id`,
    {
      schema: {
        tags: ["Customers"],
        summary: "Edit a customer",
        params: { $ref: "requestByIdParams#" },
        body: {
          type: "object",
          $ref: "customer#",
        },
        response: {
          200: {
            description: "OK",
            type: "object",
            $ref: "customer#",
          },
          404: {
            description: "Not Found",
            type: "null",
          },
        },
        security: [],
      },
    },
    async ({ params: { id }, body }, res) => {
      const customerCount = await server.prisma.customer.count({
        where: { id },
      });
      if (customerCount === 0) return res.status(404).send();

      const customer = await server.prisma.customer.update({
        where: { id },
        data: body,
      });
      return res.status(200).send(customer);
    },
  );

  server.delete<RequestByIdParams>(
    `${Endpoints.customers}/:id`,
    {
      schema: {
        tags: ["Customers"],
        summary: "Delete a customer",
        params: { $ref: "requestByIdParams#" },
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
        security: [],
      },
    },
    async ({ params: { id } }, res) => {
      const customerCount = await server.prisma.customer.count({
        where: { id },
      });
      if (customerCount === 0) return res.status(404).send();

      await server.prisma.customer.delete({
        where: { id },
      });
      return res.status(204).send();
    },
  );

  return Promise.resolve();
};

export default customers;
