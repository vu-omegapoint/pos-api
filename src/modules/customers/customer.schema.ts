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
    phone: z.string({
      required_error: "Phone is required",
      invalid_type_error: "Phone must be a string",
    }),
  }),
  address: z.object({
    street: z.string(),
    city: z.string({
      required_error: "City is required",
      invalid_type_error: "City must be a string",
    }),
    state: z.string(),
    zip: z.string(),
  }),
};

const customerGenerated = {
  id: z
    .string({
      required_error: "Id is required",
      invalid_type_error: "Id must be a UUID format string",
    })
    .uuid(),
};

const createCustomerSchema = z.object({
  ...customerCore,
});

const createCustomerResponseSchema = z.object({
  ...customerGenerated,
  ...customerCore,
});

const updateCustomerSchema = z.object({
  ...customerCore,
});

const updateCustomerResponseSchema = z.object({
  ...customerGenerated,
  ...customerCore,
});

const requestCustomerByIdParams = z.object({
  id: z
    .string({
      required_error: "Id is required",
      invalid_type_error: "Id must be a UUID format string",
    })
    .uuid(),
});

const customerResponseSchema = z.object({
  ...customerGenerated,
  ...customerCore,
});
const customersResponseSchema = z.array(customerResponseSchema);

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;
export type UpdateCustomerInput = z.infer<typeof updateCustomerSchema>;
export type RequestCustomerByIdParams = z.infer<
  typeof requestCustomerByIdParams
>;

export const { schemas: customerSchemas, $ref } = buildJsonSchemas({
  createCustomerSchema,
  createCustomerResponseSchema,
  updateCustomerSchema,
  updateCustomerResponseSchema,
  requestCustomerByIdParams,
  customerResponseSchema,
  customersResponseSchema,
});
