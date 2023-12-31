import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const customerCore = {
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  contactInfo: z.object({
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a valid email string",
      })
      .email(),
    phone: z
      .string({
        invalid_type_error: "Phone must be a string",
      })
      .optional(),
  }),
  address: z.object({
    street: z
      .string({ invalid_type_error: "Street must be a string" })
      .optional(),
    city: z.string({
      required_error: "City is required",
      invalid_type_error: "City must be a string",
    }),
    state: z
      .string({ invalid_type_error: "State must be a string" })
      .optional(),
    zip: z.string({ invalid_type_error: "Zip must be a string" }).optional(),
  }),
};

const customerGenerated = {
  id: z.string().uuid(),
};

const createOrUpdateCustomerSchema = z.object({
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
