import { FastifyPluginAsync } from "fastify";
import { Endpoints } from "../constants";

const pingPong: FastifyPluginAsync = (server, _opts) => {
  server.get(
    Endpoints.ping,
    {
      schema: {
        hide: true,
        tags: ["Mock"],
        summary: "Play ping-pong",
        response: {
          200: {
            description: "OK",
            type: "null",
          },
        },
        security: [],
      },
    },
    () => "Pong! 🏓",
  );

  return Promise.resolve();
};

export default pingPong;
