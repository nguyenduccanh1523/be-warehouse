const CustomerRepository = require('../repositories/CustomerRepository');
const Customer = require('../models/Customer');

class CustomerService {
  async getAll(query) {
    return await CustomerRepository.findAll(query);
  }

  async getById(id) {
    return await CustomerRepository.findById(id);
  }

  async create(data) {
    const customer = new Customer(null, data.name, data.email, data.phone, data.address);
    const id = await CustomerRepository.create(customer);
    return { id, ...customer };
  }

  async update(id, data) {
    const customer = new Customer(id, data.name, data.email, data.phone, data.address);
    const updatedCustomer = await CustomerRepository.update(id, customer);
    return updatedCustomer;
  }

  async delete(id) {
    const deleted = await CustomerRepository.delete(id);
    return deleted;
  }
}

module.exports = new CustomerService();
