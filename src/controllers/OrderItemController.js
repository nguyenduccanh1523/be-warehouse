const OrderItemService = require("../services/OrderItemService");

class OrderItemController {
  async getAll(req, res) {
    const data = await OrderItemService.getAll(req.query);
    res.json(data);
  }

  async getById(req, res) {
    const { id } = req.params;
    const orderItem = await OrderItemService.getById(id);
    if (!orderItem) {
      return res.status(404).json({ message: "Order item not found" });
    }
    res.json(orderItem);
  }

  async create(req, res) {
    const data = await OrderItemService.create(req.body);
    res.status(201).json(data);
  }

  async delete(req, res) {
    const deleted = await OrderItemService.delete(req.params.id);
    res.json({ deleted });
  }

  async update(req, res) {
    const updated = await OrderItemService.update(req.params.id, req.body);
    res.json({ updated });
  }

}

module.exports = new OrderItemController();
