const db = require("../config/db");
const Order = require("../models/Order");

class OrderRepository {
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
            .join(", ")`,
        customers.id AS customer_id_real,
        customers.name AS customer_name,
        customers.email AS customer_email,
        customers.phone AS customer_phone,
        customers.address AS customer_address`
        : `
      orders.id, orders.order_date, orders.total_amount, orders.customer_id,
      customers.id AS customer_id_real,
      customers.name AS customer_name,
      customers.email AS customer_email,
      customers.phone AS customer_phone,
      customers.address AS customer_address`;

    let whereClause = "WHERE 1";
    const params = [];

    // Search
    if (q) {
      whereClause += ` AND (order_number LIKE ?)`;
      params.push(`%${q}%`);
    }

    for (const [key, value] of Object.entries(filters)) {
      if (["limit", "skip", "select", "sort", "q"].includes(key)) continue;
      whereClause += ` AND \`${key}\` = ?`;
      params.push(value);
    }

    let orderClause = "";
    if (sort) {
      const direction = sort.startsWith("-") ? "DESC" : "ASC";
      const column = sort.replace(/^[-+]/, "");
      orderClause = `ORDER BY \`${column}\` ${direction}`;
    }

    const fromClause = `FROM orders LEFT JOIN customers ON orders.customer_id = customers.id`;

    const countQuery = `SELECT COUNT(*) as total ${fromClause} ${whereClause}`;
    const [countResult] = await db.query(countQuery, params);
    const total = countResult[0].total;

    const query = `SELECT ${columns} ${fromClause} ${whereClause} ${orderClause} LIMIT ? OFFSET ?`;
    params.push(parsedLimit, parsedSkip);

    const [rows] = await db.query(query, [...params, parsedLimit, parsedSkip]);

    const data = rows.map((row) => {
      const {
        customer_id_real,
        customer_name,
        customer_email,
        customer_phone,
        customer_address,
        ...orderFields
      } = row;

      return {
        ...orderFields,
        customer: customer_id_real
          ? {
              id: customer_id_real,
              name: customer_name,
              email: customer_email,
              phone: customer_phone,
              address: customer_address,
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
    const query = "SELECT * FROM orders WHERE id = ?";
    const [rows] = await db.query(query, [id]);
    return rows.length ? new Order(rows[0]) : null;
  }

  async create(orderData) {
    const query =
      "INSERT INTO orders (customer_id, order_date, total_amount) VALUES (?, ?, ?)";
    const [result] = await db.query(query, [
      orderData.customer_id,
      orderData.order_date,
      orderData.total_amount,
    ]);
    return new Order({
      id: result.insertId,
      ...orderData,
    });
  }

  async update(id, orderData) {
    const query =
      "UPDATE orders SET customer_id = ?, order_date = ?, total_amount = ? WHERE id = ?";
    const [result] = await db.query(query, [
      orderData.customer_id,
      orderData.order_date,
      orderData.total_amount,
      id,
    ]);
    return result.affectedRows > 0 ? new Order({ id, ...orderData }) : null;
  }

  async delete(id) {
    const query = "DELETE FROM orders WHERE id = ?";
    const [result] = await db.query(query, [id]);
    return result.affectedRows > 0;
  }
}

module.exports = new OrderRepository();
