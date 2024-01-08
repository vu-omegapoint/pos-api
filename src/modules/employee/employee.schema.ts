import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

export enum PermissionLevels {
  read = "read",
  write = "write",
  admin = "admin",
}

const permissionsSchema = z
  .array(
    z.object({
      name: z.string(),
      level: z.nativeEnum(PermissionLevels),
    }),
  )
  .refine((items) => new Set(items.map((x) => x.name)).size === items.length, {
    message: "Permission name must be unique",
  });

export enum Weekdays {
  monday = "monday",
  tuesday = "tuesday",
  wednesday = "wednesday",
  thursday = "thursday",
  friday = "friday",
  saturday = "saturday",
  sunday = "sunday",
}

const scheduleSchema = z
  .array(
    z
      .object({
        weekday: z.nativeEnum(Weekdays),
        startTime: z.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/),
        endTime: z.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/),
      })
      .refine((x) => x.startTime < x.endTime, {
        message: "Start time must be before end time",
      }),
  )
  .refine(
    (items) => new Set(items.map((x) => x.weekday)).size === items.length,
    {
      message: "Weekday name must be unique",
    },
  );

const employeeCore = {
  name: z.string(),
};
const employeeGenerated = {
  id: z.string().uuid(),
};

export const createOrUpdateEmployeeSchema = z.object({
  ...employeeCore,
  schedule: scheduleSchema,
  permissions: permissionsSchema,
});

const employeeResponseSchema = z.object({
  ...employeeGenerated,
  ...employeeCore,
  schedule: scheduleSchema,
  permissions: permissionsSchema,
});
const employeesResponseSchema = z.array(employeeResponseSchema);

export const updateEmployeeScheduleSchema = z.object({
  schedule: scheduleSchema,
});
const updateEmployeeScheduleResponseSchema = z.object({
  ...employeeGenerated,
  schedule: scheduleSchema,
});

export const updateEmployeePermissionsSchema = z.object({
  permissions: permissionsSchema,
});
const updateEmployeePermissionsResponseSchema = z.object({
  ...employeeGenerated,
  permissions: permissionsSchema,
});

export type CreateOrUpdateEmployeeInput = z.infer<
  typeof createOrUpdateEmployeeSchema
>;
export type UpdateEmployeePermissionsInput = z.infer<
  typeof updateEmployeePermissionsSchema
>;
export type UpdateEmployeeScheduleInput = z.infer<
  typeof updateEmployeeScheduleSchema
>;

export const { schemas: employeeSchemas, $ref: $employeeRef } =
  buildJsonSchemas(
    {
      employeeResponseSchema,
      employeesResponseSchema,
      createOrUpdateEmployeeSchema,
      updateEmployeePermissionsSchema,
      updateEmployeeScheduleSchema,
      updateEmployeePermissionsResponseSchema,
      updateEmployeeScheduleResponseSchema,
    },
    { $id: "EmployeeSchemas" },
  );
