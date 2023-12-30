const genericSchemas = {
  requestByIdParams: {
    $id: "requestByIdParams",
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
  },
} as const;

export { genericSchemas as GenericSchemas };

const modelSchemas = {
  address: {
    $id: "address",
    type: "object",
    properties: {
      id: { type: "string" },
      street: { type: "string" },
      city: { type: "string" },
      state: { type: "string" },
      zip: { type: "string" },
    },
    required: ["street", "city", "state", "zip"],
  },
  contactInfo: {
    $id: "contactInfo",
    type: "object",
    properties: {
      id: { type: "string" },
      email: { type: "string" },
      phone: { type: "string" },
    },
    required: ["email", "phone"],
  },
  customer: {
    $id: "customer",
    type: "object",
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      contactInfo: { $ref: "contactInfo#" },
      address: { $ref: "address#" },
    },
    required: ["name", "contactInfo", "address"],
  },
} as const;

export { modelSchemas as ModelSchemas };
