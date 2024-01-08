import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

export const requestByIdParams = z.object({
  id: z.string().uuid(),
});

const errorResponse = z.object({
  message: z.string(),
});

const noContentResponse = z.never();

const validationErrorResponse = errorResponse.extend({
  issues: z.array(z.string()),
});

export type RequestByIdParams = z.infer<typeof requestByIdParams>;

export const { schemas: genericSchemas, $ref: $genericRef } = buildJsonSchemas(
  {
    requestByIdParams,
    errorResponse,
    noContentResponse,
    validationErrorResponse,
  },
  { $id: "GenericSchemas" },
);
