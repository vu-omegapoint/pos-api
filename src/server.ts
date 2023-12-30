import closeWithGrace from "close-with-grace";
import fastify from "fastify";
import FastifySwagger from "@fastify/swagger";
import FastifySwaggerUI from "@fastify/swagger-ui";
import App from "./app";

// Instantiate Fastify with some config
const server = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        levelFirst: true,
        colorize: true,
        translateTime: "hh:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
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

void server.register(FastifySwagger, swaggerOptions);
void server.register(FastifySwaggerUI, swaggerUIOptions);

// Register your application as a normal plugin.
void server.register(App);

// Add graceful shutdown.
const closeListeners = closeWithGrace({ delay: 500 }, async function ({ err }) {
  if (err) server.log.error(err);
  await server.close();
} as closeWithGrace.CloseWithGraceAsyncCallback);

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
