import { FastifyReply } from "fastify";

export const createBadRequestResponse = (
  reply: FastifyReply,
  ...message: string[]
): FastifyReply => {
  return reply.code(400).send({
    message: "The request was invalid.",
    issues: message,
  });
};
