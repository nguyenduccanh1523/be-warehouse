const SupplierService = require("../services/SupplierService");

class SupplierController {
  async getAll(req, res) {
    const data = await SupplierService.getAll(req.query);
    res.json(data);
  }

  async getById(req, res) {
    const { id } = req.params;
    const supplier = await SupplierService.getById(id);
    if (!supplier)
      return res.status(404).json({ message: "Supplier not found" });
    res.json(supplier);
  }

  async create(req, res) {
    const data = await SupplierService.create(req.body);
    res.status(201).json(data);
  }

  async update(req, res) {
    const updated = await SupplierService.update(req.params.id, req.body);
    if (!updated)
      return res.status(404).json({ message: "Supplier not found" });
    res.json(updated);
  }

  async delete(req, res) {
    const deleted = await SupplierService.delete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Supplier not found" });
    res.status(204).send();
  }
}

module.exports = new SupplierController();
