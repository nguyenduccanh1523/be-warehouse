const OrderItemRepository = require("../repositories/OrderItemRepository");
const OrderItem = require("../models/OrderItem");

class OrderItemService {
  async getAll(query) {
    return await OrderItemRepository.findAll(query);
  }

  async getById(id) {
    return await OrderItemRepository.findById(id);
  }

  async create(data) {
    const orderItem = new OrderItem(null, data.order_id, data.product_id, data.quantity, data.price);
    const createdOrderItem = await OrderItemRepository.create(orderItem);
    return { createdOrderItem, ...orderItem };
  }

  async delete(id) {
    const deleted = await OrderItemRepository.delete(id);
    return deleted;
  }

  async update(id, data) {
    const { quantity } = data;
    const updatedOrderItem = await OrderItemRepository.update(id, quantity);
    return updatedOrderItem;
  }
}

module.exports = new OrderItemService();