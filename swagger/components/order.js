module.exports = {
  Order: {
    type: "object",
    properties: {
      id: { type: "integer" },
      customer_id: { type: "integer" },
      order_date: { type: "string", format: "date-time" },
      total_amount: { type: "number", format: "float" },
    },
  },
  OrderInput: {
    type: "object",
    properties: {
      customer_id: { type: "integer" },
      order_date: { type: "string", format: "date-time" },
      total_amount: { type: "number", format: "float" },
    },
    required: ["customer_id", "order_date", "total_amount"],
  },
};
