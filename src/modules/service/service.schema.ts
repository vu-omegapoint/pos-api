import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const serviceCore = {
  name: z.string(),
  description: z.string().optional(),
  price: z.number().min(0),
  duration: z.number().min(1).describe("Time the service takes in minutes"),
};

const serviceGenerated = {
  id: z.string().uuid(),
};

export const createOrUpdateServiceSchema = z.object({
  ...serviceCore,
});

const serviceResponseSchema = z.object({
  ...serviceGenerated,
  ...serviceCore,
});

const servicesResponseSchema = z.array(serviceResponseSchema);

export type CreateOrUpdateServiceInput = z.infer<
  typeof createOrUpdateServiceSchema
>;

export const { schemas: serviceSchemas, $ref: $serviceRef } = buildJsonSchemas(
  {
    serviceResponseSchema,
    servicesResponseSchema,
    createOrUpdateServiceSchema,
  },
  { $id: "ServiceSchemas" },
);
