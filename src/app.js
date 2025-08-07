const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger/index');

const userRoutes = require('./routes/user.routes');
const customerRoutes = require('./routes/customer.routes');
const supplierRoutes = require('./routes/supplier.routes');
const productRoutes = require('./routes/product.routes');
const orderRoutes = require('./routes/order.routes');
const orderItemRoutes = require('./routes/orderitem.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health check (đảm bảo hoạt động)
app.get('/health', (req, res) => {
  res.send('✅ Server is alive!');
});

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/orderitems', orderItemRoutes);

// Optional: catch 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

module.exports = app;
