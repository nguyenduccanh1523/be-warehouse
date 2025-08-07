const ProductService = require("../services/ProductService");

class ProductController {
  async getAll(req, res) {
    const products = await ProductService.getAll(req.query);
    res.json(products);
  }

  async getById(req, res) {
    const product = await ProductService.getById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  }

  async create(req, res) {
    const product = await ProductService.create(req.body);
    res.status(201).json(product);
  }

  async update(req, res) {
    const updatedProduct = await ProductService.update(req.params.id, req.body);
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  }

  async delete(req, res) {
    const deleted = await ProductService.delete(req.params.id);
    if (!deleted) { 
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(204).send();
  } 

}

module.exports = new ProductController();
