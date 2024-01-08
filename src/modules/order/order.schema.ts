import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

export enum OrderStatus {
  pending = "pending",
  completed = "completed",
  cancelled = "cancelled",
}

const orderCore = {
  items: z.array(
    z.object({
      id: z.string().uuid(),
      quantity: z.number(),
      employeeId: z.string().uuid(),
    }),
  ),
  services: z.array(
    z.object({
      id: z.string().uuid(),
      startTime: z.date(),
      employeeId: z.string().uuid(),
    }),
  ),
  notes: z.string().optional(),
};

const orderGenerated = {
  id: z.string().uuid(),
  createdAt: z.date(),
  status: z.nativeEnum(OrderStatus),
};

export const createOrderSchema = z.object({
  ...orderCore,
});

export const updateOrderSchema = z.object({
  ...orderGenerated,
  ...orderCore,
});

const orderResponseSchema = z.object({
  ...orderGenerated,
  ...orderCore,
});

const ordersResponseSchema = z.array(orderResponseSchema);

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderInput = z.infer<typeof updateOrderSchema>;

export const { schemas: orderSchemas, $ref: $orderRef } = buildJsonSchemas(
  {
    orderResponseSchema,
    ordersResponseSchema,
    createOrderSchema,
    updateOrderSchema,
  },
  { $id: "OrderSchemas" },
);
