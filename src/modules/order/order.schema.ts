import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

export enum OrderStatus {
  pending = "pending",
  completed = "completed",
  cancelled = "cancelled",
}

const orderCore = {
  customerId: z.string().uuid(),
  items: z.array(
    z.object({
      id: z.string().uuid(),
      quantity: z.number().min(1),
      employeeId: z.string().uuid(),
    }),
  ),
  services: z.array(
    z.object({
      id: z.string().uuid(),
      startTime: z.date().min(new Date()),
      employeeId: z.string().uuid(),
    }),
  ),
  notes: z.string().optional(),
};

const orderGenerated = {
  id: z.string().uuid(),
  status: z.nativeEnum(OrderStatus),
};

export const createOrUpdateOrderSchema = z.object({
  ...orderCore,
});

const orderResponseSchema = z.object({
  ...orderGenerated,
  ...orderCore,
});

const ordersResponseSchema = z.array(orderResponseSchema);

export type CreateOrUpdateOrderInput = z.infer<
  typeof createOrUpdateOrderSchema
>;

export const { schemas: orderSchemas, $ref: $orderRef } = buildJsonSchemas(
  {
    orderResponseSchema,
    ordersResponseSchema,
    createOrUpdateOrderSchema,
  },
  { $id: "OrderSchemas" },
);
