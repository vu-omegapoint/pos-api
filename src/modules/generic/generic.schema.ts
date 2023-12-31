import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const requestByIdParams = z.object({
  id: z
    .string({
      required_error: "Id is required",
      invalid_type_error: "Id must be a UUID format string",
    })
    .uuid(),
});

const errorResponse = z.object({
  message: z.string(),
});

const noContentResponse = z.never();

export type RequestByIdParams = z.infer<typeof requestByIdParams>;

export const { schemas: genericSchemas, $ref: $genericRef } = buildJsonSchemas(
  {
    requestByIdParams,
    errorResponse,
    noContentResponse,
  },
  { $id: "GenericSchemas" },
);
