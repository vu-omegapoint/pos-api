import { join } from "path";
import AutoLoad from "@fastify/autoload";
import { FastifyPluginAsync, FastifyServerOptions } from "fastify";

export const app: FastifyPluginAsync<FastifyServerOptions> = (
  fastify,
  opts,
) => {
  // This loads all plugins defined in /plugins/ directory
  void fastify.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: opts,
  });

  // This loads all routes defined in /routes/ directory.
  void fastify.register(AutoLoad, {
    dir: join(__dirname, "routes"),
    options: opts,
  });

  return Promise.resolve();
};

export default app;
