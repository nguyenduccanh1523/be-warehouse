module.exports = {
  Product: {
    type: "object",
    properties: {
      id: { type: "integer" },
      name: { type: "string" },
      quantity: { type: "integer" },
      price: { type: "number" },
      supplier_id: { type: "integer" }
    }
  },
  ProductCreate: {
    type: "object",
    required: ["name", "quantity", "price", "supplier_id"],
    properties: {
      name: { type: "string" },
      quantity: { type: "integer" },
      price: { type: "number" },
      supplier_id: { type: "integer" }
    }
  }
};
