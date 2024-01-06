import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const employeeCore = {
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
};
const employeeGenerated = {
  id: z.string().uuid(),
};

const createOrUpdateEmployeeCoreSchema = z.object({
  ...employeeCore,
});

export enum PermissionLevels {
  read = "read",
  write = "write",
  admin = "admin",
}

const permissionSchema = z.object({
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
});
const updateEmployeePermissionsSchema = z.object({
  permissions: z.array(permissionSchema),
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
const workShiftSchema = z.object({
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
});

const updateEmployeeScheduleSchema = z.object({
  schedule: z.array(workShiftSchema),
});

const employeeResponseSchema = z.object({
  ...employeeGenerated,
  ...employeeCore,
  schedule: z.array(workShiftSchema),
  permissions: z.array(permissionSchema),
});
const employeesResponseSchema = z.array(employeeResponseSchema);
const updateEmployeeCoreResponseSchema = z.object({
  ...employeeGenerated,
  ...employeeCore,
});
const updatePermissionsResponseSchema = z.object({
  ...employeeGenerated,
  permissions: z.array(permissionSchema),
});
const updateScheduleResponseSchema = z.object({
  ...employeeGenerated,
  schedule: z.array(workShiftSchema),
});

export type CreateOrUpdateEmployeeCoreInput = z.infer<
  typeof createOrUpdateEmployeeCoreSchema
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
      permissionSchema,
      workShiftSchema,
      employeeResponseSchema,
      employeesResponseSchema,
      createOrUpdateEmployeeCoreSchema,
      updateEmployeePermissionsSchema,
      updateEmployeeScheduleSchema,
      updateEmployeeCoreResponseSchema,
      updatePermissionsResponseSchema,
      updateScheduleResponseSchema,
    },
    { $id: "EmployeeSchemas" },
  );
