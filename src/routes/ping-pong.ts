import { FastifyPluginAsync } from "fastify";
import { Endpoints } from "../constants";

const pingPong: FastifyPluginAsync = (server, _opts) => {
  server.get(
    Endpoints.pingEndpoint,
    {
      schema: {
        description: "Test whether the API works",
        tags: ["Mock"],
        summary: "Wanna play some ping pong?",
        response: {
          200: {
            description: "Successful response",
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
