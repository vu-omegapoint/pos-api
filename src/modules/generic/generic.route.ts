import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from "fastify";

export const bodyValidationPreHandler =
  (schema: Zod.AnyZodObject) =>
  <TRequest extends FastifyRequest, TReply extends FastifyReply>(
    request: TRequest,
    reply: TReply,
    done: HookHandlerDoneFunction,
  ) => {
    const result = schema.safeParse((request as FastifyRequest).body);
    if (result.success) return done();
    return (reply as FastifyReply).code(400).send({
      message: "At least one validation error has occurred.",
      issues: result.error.errors.map((x) => x.message),
    });
  };
