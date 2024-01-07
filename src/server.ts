import closeWithGrace, { CloseWithGraceAsyncCallback } from "close-with-grace";
import dotenv from "dotenv";
import fastify from "fastify";
import { withRefResolver } from "fastify-zod";
import FastifySwagger from "@fastify/swagger";
import FastifySwaggerUI from "@fastify/swagger-ui";
import { Endpoints } from "./constants";
import PrismaPlugin from "./prisma";
import { customerRoutes, customerSchemas } from "./modules/customers";
import { employeeRoutes, employeeSchemas } from "./modules/employees";
import { genericSchemas } from "./modules/generic";
import { itemRoutes, itemSchemas } from "./modules/item";
import { serviceSchemas } from "./modules/service";

// Load process.env from .env file.
dotenv.config();

// Instantiate Fastify with some config
const server = fastify({
  logger: {
    level: process.env.LOG_LEVEL,
  },
  ignoreTrailingSlash: true,
});

// Configure swagger
const swaggerOptions = {
  openapi: {
    info: {
      title: "Point of Sale System API",
      description: "API implemented for Team Dizainieriai contract.",
      version: "1.0.0",
      contact: { name: "Team OmegaPoint" },
    },
    host: "localhost",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
  },
};
const swaggerUIOptions = {
  routePrefix: process.env.SWAGGER_ROUTE_PREFIX,
  exposeRoute: true,
  theme: { title: "PoS System OpenAPI Documentation" },
  uiConfig: { deepLinking: true },
};

// Register Fastify Swagger plugins.
void server.register(FastifySwagger, withRefResolver(swaggerOptions));
void server.register(FastifySwaggerUI, swaggerUIOptions);

// Register Prisma plugin.
void server.register(PrismaPlugin);

// Register all routes
void server.register(customerRoutes, { prefix: Endpoints.customers });
void server.register(itemRoutes, { prefix: Endpoints.items });
void server.register(employeeRoutes, { prefix: Endpoints.employees });

// Register all schemas.
for (const schema of [
  ...genericSchemas,
  ...customerSchemas,
  ...itemSchemas,
  ...serviceSchemas,
  ...employeeSchemas,
]) {
  server.addSchema(schema);
}

// Add graceful shutdown.
const closeListeners = closeWithGrace({ delay: 500 }, async function ({ err }) {
  if (err) server.log.error(err);
  await server.close();
} as CloseWithGraceAsyncCallback);

server.addHook("onClose", (_instance, done) => {
  closeListeners.uninstall();
  done();
});

// Start listening.
server.listen(
  { port: process.env.PORT ? parseInt(process.env.PORT) : 3000 },
  (err) => {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }
  },
);
