class Product {
  constructor(id, name, quantity, price, supplier_id) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
    this.price = price;
    this.supplier_id = supplier_id;
  }
}

module.exports = Product;
