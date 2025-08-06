const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Backend API Warehouse',
      version: '1.0.0'
    },
    components: require('./components/security'),
    paths: {
      ...require('./paths/auth'),
      ...require('./paths/users'),
      
    }
  },
  apis: []
};

module.exports = swaggerJsDoc(options);
