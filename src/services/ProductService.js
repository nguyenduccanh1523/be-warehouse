const ProductRepository = require("../repositories/ProductRepository");
const Product = require("../models/Product");

class ProductService {
  async getAll(query) {
    const products = await ProductRepository.findAll(query);
    return products;
  }

  async getById(id) {
    const product = await ProductRepository.findById(id);
    return product;
  }

  async create(data) {
    const product = new Product(null, data.name, data.quantity, data.price, data.supplier_id);
    const createdProduct = await ProductRepository.create(product);
    return createdProduct;
  }

  async update(id, data) {
    const product = new Product(id, data.name, data.quantity, data.price, data.supplier_id);
    const updatedProduct = await ProductRepository.update(id, product);
    return updatedProduct;
  }

  async delete(id) {
    const deleted = await ProductRepository.delete(id);
    return deleted;
  }

}

module.exports = new ProductService();
