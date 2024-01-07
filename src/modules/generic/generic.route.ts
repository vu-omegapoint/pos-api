import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from "fastify";
import z from "zod";

export const bodyValidationPreHandler =
  <TRequest extends FastifyRequest, TReply extends FastifyReply>(
    schema: z.AnyZodObject,
  ) =>
  (request: TRequest, reply: TReply, done: HookHandlerDoneFunction) => {
    const result = schema.safeParse(request.body);
    if (result.success) return done();
    return reply.code(400).send({
      message: "At least one validation error has occurred.",
      issues: result.error.errors.map((x) => x.message),
    });
  };
