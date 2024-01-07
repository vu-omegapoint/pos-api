import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from "fastify";
import z from "zod";

export const preValidationHandler =
  <TRequest extends FastifyRequest, TReply extends FastifyReply>(
    paramsSchema?: z.AnyZodObject,
    bodySchema?: z.AnyZodObject,
  ) =>
  (request: TRequest, reply: TReply, done: HookHandlerDoneFunction) => {
    if (paramsSchema) {
      const resultParams = paramsSchema.safeParse(request.params);
      if (!resultParams.success) {
        return reply.code(400).send({
          message: "At least one validation error has occurred.",
          issues: resultParams.error.errors.map(
            (x) => `${x.path.join("/")}: ${x.message}`,
          ),
        });
      }
    }
    if (bodySchema) {
      const resultBody = bodySchema.safeParse(request.body);
      if (!resultBody.success) {
        return reply.code(400).send({
          message: "At least one validation error has occurred.",
          issues: resultBody.error.errors.map(
            (x) => `${x.path.join("/")}: ${x.message}`,
          ),
        });
      }
    }
    return done();
  };
