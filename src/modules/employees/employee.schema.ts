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
      name: z.string({
        required_error: "Permission name is required",
        invalid_type_error: "Permission name must be a string",
      }),
      level: z.nativeEnum(PermissionLevels, {
        required_error: "Permission level is required",
        invalid_type_error: `Permission level must match one of the allowed string values: ${Object.values(
          PermissionLevels,
        ).join(", ")}`,
      }),
    }),
    {
      required_error: "Permissions are required",
      invalid_type_error: "Permissions must be an array of permission objects",
    },
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
        weekday: z.nativeEnum(Weekdays, {
          required_error: "Weekday is required",
          invalid_type_error: `Weekday must match one of the allowed string values: ${Object.values(
            Weekdays,
          ).join(", ")}`,
        }),
        startTime: z
          .string({
            required_error: "Start time is required",
            invalid_type_error: "Start time must be a valid HH:MM time value",
          })
          .regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/),
        endTime: z
          .string({
            required_error: "End time is required",
            invalid_type_error: "End time must be a valid HH:MM time value",
          })
          .regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/),
      })
      .refine((x) => x.startTime < x.endTime, {
        message: "Start time must be before end time",
      }),
    {
      required_error: "Schedule is required",
      invalid_type_error: "Schedule must be an array of work shift objects",
    },
  )
  .refine(
    (items) => new Set(items.map((x) => x.weekday)).size === items.length,
    {
      message: "Weekday name must be unique",
    },
  );

const employeeCore = {
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
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
