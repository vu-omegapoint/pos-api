import { FastifyPluginAsync } from "fastify";
import { Endpoints } from "../constants";
import { Prisma } from "@prisma/client";

const customers: FastifyPluginAsync = (server, _opts) => {
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
              //$ref: "#/components/schemas/Customer", // TODO - see how to generate schemas from Prisma models
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

  server.get<{ Params: { id: string } }>(
    `${Endpoints.customers}/:id`,
    {
      schema: {
        tags: ["Customers"],
        summary: "Get a specific customer",
        params: {
          type: "object",
          properties: {
            id: { type: "string" },
          },
        },
        response: {
          200: {
            description: "OK",
            type: "object",
            //$ref: "#/components/schemas/Customer",
          },
          404: {
            description: "Not Found",
            type: "null",
          },
        },
        security: [],
      },
    },
    async (req, res) => {
      const { id } = req.params;
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
          // $ref: "#/components/schemas/Customer",
        },
        response: {
          201: {
            description: "Created",
            type: "object",
            //$ref: "#/components/schemas/Customer",
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

  server.put<{ Params: { id: string }; Body: Prisma.CustomerUpdateInput }>(
    `${Endpoints.customers}/:id`,
    {
      schema: {
        tags: ["Customers"],
        summary: "Edit a customer",
        params: {
          type: "object",
          properties: {
            id: { type: "string" },
          },
        },
        body: {
          type: "object",
          // $ref: "#/components/schemas/Customer",
        },
        response: {
          200: {
            description: "OK",
            type: "object",
            // $ref: "#/components/schemas/Customer",
          },
          404: {
            description: "Not Found",
            type: "null",
          },
        },
        security: [],
      },
    },
    async (req, res) => {
      const { id } = req.params;
      const customerCount = await server.prisma.customer.count({
        where: { id },
      });
      if (customerCount === 0) return res.status(404).send();

      const customer = await server.prisma.customer.update({
        where: { id: req.params.id },
        data: req.body,
      });
      return res.status(200).send(customer);
    },
  );

  server.delete<{ Params: { id: string } }>(
    `${Endpoints.customers}/:id`,
    {
      schema: {
        tags: ["Customers"],
        summary: "Delete a customer",
        params: {
          type: "object",
          properties: {
            id: { type: "string" },
          },
        },
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
    async (req, res) => {
      const { id } = req.params;
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
