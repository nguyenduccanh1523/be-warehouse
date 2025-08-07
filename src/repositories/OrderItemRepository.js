const db = require("../config/db");
const OrderItem = require("../models/OrderItem");

class OrderItemRepository {
  async findAll({
    limit = 10,
    skip = 0,
    select = "*",
    sort,
    q,
    ...filters
  } = {}) {
    const parsedLimit = Number(limit);
    const parsedSkip = Number(skip);
    const columns =
      select && select !== "*"
        ? select
            .split(",")
            .map((col) => `\`${col.trim()}\``)
            .join(", ") +
          `,
        products.id AS product_id_real,
        products.name AS product_name`
        : `
      order_items.id, order_items.order_id, order_items.quantity, order_items.price, order_items.product_id,
      products.id AS product_id_real,
      products.name AS product_name`;

    let whereClause = "WHERE 1";
    const params = [];

    // Search
    // if (q) {
    //   whereClause += ` AND (product_name LIKE ?)`;
    //   params.push(`%${q}%`);
    // }

    // Filters (e.g., product_id=..., order_id=...)
    for (const [key, value] of Object.entries(filters)) {
      if (["limit", "skip", "select", "sort", "q"].includes(key)) continue;
      whereClause += ` AND \`${key}\` = ?`;
      params.push(value);
    }

    // Sort
    let orderClause = "";
    if (sort) {
      const direction = sort.startsWith("-") ? "DESC" : "ASC";
      const column = sort.replace(/^[-+]/, "");
      orderClause = `ORDER BY \`${column}\` ${direction}`;
    }

    const fromClause = `FROM order_items LEFT JOIN products ON order_items.product_id = products.id`;

    // Total query
    const countQuery = `SELECT COUNT(*) as total ${fromClause} ${whereClause}`;
    const [countResult] = await db.query(countQuery, params);
    const total = countResult[0].total;

    const query = `SELECT ${columns} ${fromClause} ${whereClause} ${orderClause} LIMIT ? OFFSET ?`;
    params.push(parsedLimit, parsedSkip);

    const [rows] = await db.query(query, [...params, parsedLimit, parsedSkip]);

    const data = rows.map((row) => {
      const { product_id_real, product_name, ...orderItemData } = row;

      return {
        ...orderItemData,
        product: product_id_real
          ? {
              id: product_id_real,
              name: product_name,
            }
          : null,
      };
    });

    return {
      data,
      total,
      limit: parsedLimit,
      skip: parsedSkip,
    };
  }

  async findById(id) {
    const query = "SELECT * FROM order_items WHERE id = ?";
    const [rows] = await db.query(query, [id]);
    if (rows.length === 0) return null;
    return new OrderItem(rows[0]);
  }

  async create(orderItem) {
    const [productRows] = await db.query(
      "SELECT price, quantity as stock FROM products WHERE id = ?",
      [orderItem.product_id]
    );
    if (productRows.length === 0) {
      throw new Error("Product not found");
    }

    const { price, stock } = productRows[0];
    if (orderItem.quantity > stock) {
      throw new Error("Insufficient stock");
    }

    const total = price * orderItem.quantity;

    // Insert order item
    await db.query(
      "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
      [orderItem.order_id, orderItem.product_id, orderItem.quantity, price]
    );

    // Update order total
    await db.query(
      "UPDATE orders SET total_amount = total_amount + ? WHERE id = ?",
      [total, orderItem.order_id]
    );

    // Update product stock
    await db.query("UPDATE products SET quantity = quantity - ? WHERE id = ?", [
      orderItem.quantity,
      orderItem.product_id,
    ]);

    return new OrderItem({ orderItem });
  }

  async delete(id) {
    const [rows] = await db.query("SELECT * FROM order_items WHERE id = ?", [
      id,
    ]);
    if (rows.length === 0) return false;

    const orderItem = rows[0];
    const total = orderItem.price * orderItem.quantity;

    // Delete order item
    await db.query("DELETE FROM order_items WHERE id = ?", [id]);

    // Update order total
    await db.query(
      "UPDATE orders SET total_amount = total_amount - ? WHERE id = ?",
      [total, orderItem.order_id]
    );

    // Update product stock
    await db.query("UPDATE products SET quantity = quantity + ? WHERE id = ?", [
      orderItem.quantity,
      orderItem.product_id,
    ]);
  }

  async update(id, new_quantity) {
    const [rows] = await db.query("SELECT * FROM order_items WHERE id = ?", [
      id,
    ]);
    if (rows.length === 0) return null;

    const orderItem = rows[0];
    const { price, quantity: old_quantity, order_id, product_id } = orderItem;

    const quantityDifference = new_quantity - old_quantity;
    const totalDifference = price * quantityDifference;

    if (quantityDifference === 0)
      return {
        message: "No change in quantity",
      };

    const [productRows] = await db.query(
      "SELECT quantity as stock FROM products WHERE id = ?",
      [product_id]
    );
    const currentStock = productRows[0].stock ?? 0;

    if (quantityDifference > 0 && currentStock < quantityDifference) {
      throw new Error("Insufficient stock");
    }

    // Update order item
    await db.query("UPDATE order_items SET quantity = ? WHERE id = ?", [
      new_quantity,
      id,
    ]);

    // Update order total
    await db.query(
      "UPDATE orders SET total_amount = total_amount + ? WHERE id = ?",
      [totalDifference, order_id]
    );

    // Update product stock
    await db.query("UPDATE products SET quantity = quantity - ? WHERE id = ?", [
      quantityDifference,
      product_id,
    ]);

    return new OrderItem({
      id,
      order_id,
      product_id,
      quantity: new_quantity,
      price,
    });
  }
}

module.exports = new OrderItemRepository();
