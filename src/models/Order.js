class Order {
  constructor(id, customer_id, order_date, total_amount) {
    this.id = id;
    this.customer_id = customer_id;
    this.order_date = order_date;
    this.total_amount = total_amount;
  }
}

module.exports = Order;
