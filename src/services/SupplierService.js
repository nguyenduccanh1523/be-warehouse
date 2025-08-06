const SupplierRepository = require("../repositories/SupplierRepository");
const Suppiler = require("../models/Supplier");

class SupplierService {
  async getAll(query) {
    return await SupplierRepository.findAll(query);
  }

  async getById(id) {
    return await SupplierRepository.findById(id);
  }

  async create(data) {
    const supplier = new Suppiler(null, data.name, data.phone, data.address);
    const id = await SupplierRepository.create(supplier);
    return { id, ...supplier };
  }

  async update(id, data) {
    const supplier = new Suppiler(id, data.name, data.phone, data.address);
    const updatedSupplier = await SupplierRepository.update(id, supplier);
    return updatedSupplier;
  }

  async delete(id) {
    const deleted = await SupplierRepository.delete(id);
    return deleted;
  }

}

module.exports = new SupplierService();