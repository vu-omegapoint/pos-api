import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const itemCore = {
  name: z.string(),
  description: z.string().optional(),
  price: z.number().min(0),
};

const itemGenerated = {
  id: z.string().uuid(),
};

const createOrUpdateItemSchema = z.object({
  ...itemCore,
});

const itemResponseSchema = z.object({
  ...itemGenerated,
  ...itemCore,
});

const itemsResponseSchema = z.array(itemResponseSchema);

export type CreateOrUpdateItemInput = z.infer<typeof createOrUpdateItemSchema>;

export const { schemas: itemSchemas, $ref: $itemRef } = buildJsonSchemas(
  {
    itemResponseSchema,
    itemsResponseSchema,
    createOrUpdateItemSchema,
  },
  { $id: "ItemSchemas" },
);
