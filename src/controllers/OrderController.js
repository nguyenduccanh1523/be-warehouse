const OrderService = require('../services/OrderService');

class OrderController {
  async getAll(req, res) {
    const orders = await OrderService.getAll(req.query);
    res.json(orders);
  }

  async getById(req, res) {
    const { id } = req.params;
    const order = await OrderService.getById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  }

  async create(req, res) {
    const order = await OrderService.create(req.body);
    res.status(201).json({ order });
  }

  async update(req, res) {
    const order = await OrderService.update(req.params.id, req.body);
    res.json({ order });
  }

  async delete(req, res) {
    const deleted = await OrderService.delete(req.params.id);
    res.json({ deleted });
  }

}

module.exports = new OrderController();
