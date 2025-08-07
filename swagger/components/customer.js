module.exports = {
  Customer: {
    type: "object",
    properties: {
      id: { type: "integer" },
      name: { type: "string" },
      email: { type: "string", format: "email" },
      phone: { type: "string" },
      address: { type: "string" },
    },
  },
  CustomerInput: {
    type: "object",
    properties: {
      name: { type: "string" },
      email: { type: "string", format: "email" },
      phone: { type: "string" },
      address: { type: "string" },
    },
    required: ["name", "email"],
  },
};
