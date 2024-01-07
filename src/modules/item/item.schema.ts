import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const itemCore = {
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  description: z
    .string({
      invalid_type_error: "Description must be a string",
    })
    .optional(),
  price: z
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .min(0),
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
