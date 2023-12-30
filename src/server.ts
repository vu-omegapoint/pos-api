import closeWithGrace, { CloseWithGraceAsyncCallback } from "close-with-grace";
import dotenv from "dotenv";
import fastify from "fastify";
import { join } from "path";
import AutoLoad from "@fastify/autoload";
import FastifySwagger from "@fastify/swagger";
import FastifySwaggerUI from "@fastify/swagger-ui";
import { GenericSchemas, ModelSchemas } from "./schemas";

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
  staticCSP: true,
};

// Register Fastify Swagger plugins.
void server.register(FastifySwagger, swaggerOptions);
void server.register(FastifySwaggerUI, swaggerUIOptions);

// Load all plugins defined in /plugins/ directory
void server.register(AutoLoad, {
  dir: join(__dirname, "plugins"),
});

// Load all routes defined in /routes/ directory.
void server.register(AutoLoad, {
  dir: join(__dirname, "routes"),
});

// Register all schemas.
for (const schema of Object.values(GenericSchemas)) {
  server.addSchema(schema);
}
for (const schema of Object.values(ModelSchemas)) {
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

// Add request cancellation handling.
server.addHook("onRequest", (request, _message, done) => {
  request.raw.on("close", () => {
    if (request.raw.destroyed) {
      request.log.info("Request has been cancelled");
    }
  });
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
