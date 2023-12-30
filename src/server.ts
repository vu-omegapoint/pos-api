import closeWithGrace, { CloseWithGraceAsyncCallback } from "close-with-grace";
import fastify from "fastify";
import AutoLoad from "@fastify/autoload";
import FastifySwagger from "@fastify/swagger";
import FastifySwaggerUI from "@fastify/swagger-ui";
import { join } from "path";

// Instantiate Fastify with some config
const server = fastify({
  logger: true,
  ignoreTrailingSlash: true,
});

// Configure swagger
const swaggerOptions = {
  openapi: {
    info: {
      title: "Point of Sale System API",
      description: "API implemented for Team Dizainieriai contract.",
      version: "1.0.0",
      contact: {
        name: "Team OmegaPoint",
      },
    },
    host: "localhost",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
  },
};
const swaggerUIOptions = {
  routePrefix: "/docs",
  exposeRoute: true,
  theme: {
    title: "PoS System OpenAPI Documentation",
  },
  uiConfig: { deepLinking: true },
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
server.addHook("onRequest", (request, message, done) => {
  request.raw.on("close", () => {
    if (request.raw.destroyed) {
      request.log.info("Request has been cancelled");
    }
  });
  done();
});

// Start listening.
server.listen({ port: 8080 }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
