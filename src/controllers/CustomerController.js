
const CustomerService = require('../services/CustomerService');

class CustomerController {
  async getAll(req, res) {
    const customers = await CustomerService.getAll(req.query);
    res.json(customers);
  }

  async getById(req, res) {
    const { id } = req.params;
    const customer = await CustomerService.getById(id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json(customer);
  }

  async create(req, res) {
    const customer = await CustomerService.create(req.body);
    res.status(201).json({ customer });
  }

  async update(req, res) {
    const customer = await CustomerService.update(req.params.id, req.body);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json(customer);
  }

  async delete(req, res) {
    const deleted = await CustomerService.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(204).send();
  }

}

module.exports = new CustomerController();