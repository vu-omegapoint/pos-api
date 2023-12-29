import fastify from "fastify";
import App from "./app";
import closeWithGrace from "close-with-grace";

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
