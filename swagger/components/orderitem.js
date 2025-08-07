module.exports = {
  OrderItem: {
    type: "object",
    properties: {
      id: { type: "integer" },
      order_id: { type: "integer" },
      product_id: { type: "integer" },
      quantity: { type: "integer" },
      price: { type: "number", format: "float" },
    },
  },
  OrderItemInput: {
    type: "object",
    properties: {
      order_id: { type: "integer" },
      product_id: { type: "integer" },
      quantity: { type: "integer" },
      price: { type: "number", format: "float" },
    },
    required: ["order_id", "product_id", "quantity", "price"],
  },
  OrderItemUpdate: {
    type: "object",
    properties: {
      quantity: { type: "integer" },
    },
    required: ["quantity"],
  },
};