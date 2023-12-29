import { FastifyPluginAsync } from "fastify";
import { Endpoints } from "../Constants";

const pingPong: FastifyPluginAsync = (server, _opts) => {
  server.get(Endpoints.pingEndpoint, (_) => {
    return "Pong! 🏓";
  });

  return Promise.resolve();
};

export default pingPong;
