const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Backend API Warehouse',
      version: '1.0.0'
    },
    components: {
      ...require('./components/security'),
      schemas: {
        ...require('./components/supplier'),
        ...require('./components/customer'),
      }
    },
    paths: {
      ...require('./paths/auth'),
      ...require('./paths/users'),
      ...require('./paths/suppliers'),
      ...require('./paths/customers'),
    }
  },
  apis: []
};

module.exports = swaggerJsDoc(options);
