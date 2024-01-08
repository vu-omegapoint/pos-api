import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const customerCore = {
  name: z.string(),
  contactInfo: z.object({
    email: z.string().email(),
    phone: z.string().optional(),
  }),
  address: z.object({
    street: z.string().optional(),
    city: z.string(),
    state: z.string().optional(),
    zip: z.string().optional(),
  }),
};

const customerGenerated = {
  id: z.string().uuid(),
};

export const createOrUpdateCustomerSchema = z.object({
  ...customerCore,
});

const customerResponseSchema = z.object({
  ...customerGenerated,
  ...customerCore,
});
const customersResponseSchema = z.array(customerResponseSchema);

export type CreateOrUpdateCustomerInput = z.infer<
  typeof createOrUpdateCustomerSchema
>;

export const { schemas: customerSchemas, $ref: $customerRef } =
  buildJsonSchemas(
    {
      customerResponseSchema,
      customersResponseSchema,
      createOrUpdateCustomerSchema,
    },
    { $id: "CustomerSchemas" },
  );
