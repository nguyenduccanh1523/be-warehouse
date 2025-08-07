const OrderRepository = require('../repositories/OrderRepository');
const Order = require('../models/Order');

class OrderService {
  async getAll(query) {
    return await OrderRepository.findAll(query);
  }

  async getById(id) {
    return await OrderRepository.findById(id);
  }

  async create(data) {
    const order = new Order(null, data.customer_id, data.order_date, data.total_amount);
    const id = await OrderRepository.create(order);
    return { id, ...order };
  }

  async update(id, data) {
    const order = new Order(id, data.customer_id, data.order_date, data.total_amount);
    const updatedOrder = await OrderRepository.update(id, order);
    return updatedOrder;
  }

  async delete(id) {
    const deleted = await OrderRepository.delete(id);
    return deleted;
  }

}

module.exports = new OrderService();
