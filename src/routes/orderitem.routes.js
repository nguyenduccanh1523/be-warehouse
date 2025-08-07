const express = require('express');
const router = express.Router();
const OrderItemController = require('../controllers/OrderItemController');
const authMiddleware = require('../middlewares/auth');

router.get('/', OrderItemController.getAll);
router.get('/:id', OrderItemController.getById);
router.post('/',  OrderItemController.create);
router.delete('/:id', OrderItemController.delete);
router.put('/:id', OrderItemController.update);

module.exports = router;