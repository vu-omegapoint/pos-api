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

const orderUpdatable = {
  status: z.nativeEnum(OrderStatus),
};

const orderGenerated = {
  id: z.string().uuid(),
};

export const createOrderSchema = z.object({
  ...orderCore,
});

export const updateOrderSchema = z.object({
  ...orderCore,
  ...orderUpdatable,
});

const orderResponseSchema = z.object({
  ...orderGenerated,
  ...orderCore,
  ...orderUpdatable,
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
