import { FastifyPluginAsync } from "fastify";
import { Endpoints } from "../constants";

const pingPong: FastifyPluginAsync = (server) => {
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
            type: "string",
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
