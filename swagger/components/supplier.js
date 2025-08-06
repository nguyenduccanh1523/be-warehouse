module.exports = {
  Supplier: {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      name: { type: 'string' },
      phone: { type: 'string' },
      address: { type: 'string' }
    }
  },
  SupplierInput: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      phone: { type: 'string' },
      address: { type: 'string' }
    },
    required: ['name']
  }
};
