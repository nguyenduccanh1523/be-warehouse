// const Customer = require('../models/Customer');
// const CustomerService = require('../services/CustomerService');

// class CustomerController {
//   async getAllCustomers(req, res) {
//     const customers = await CustomerService.getAllCustomers();
//     res.json(customers);
//   }

//   async createCustomer(req, res) {
//     const {name, email, phone, address} = req.body;
//     const newCustomer = new Customer(null, name, email, phone, address);
//     const customer = await CustomerService.createCustomer(newCustomer);
//     res.status(201).json({customer});
//   }

// }

// module.exports = new CustomerController();