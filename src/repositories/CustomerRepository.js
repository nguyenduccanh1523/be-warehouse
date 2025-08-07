const db = require("../config/db");
const Customer = require("../models/Customer");

class CustomerRepository {
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
            .join(", ")
        : "*";

    let whereClause = "WHERE 1";
    const params = [];

    // Search
    if (q) {
      whereClause += ` AND (name LIKE ? OR email LIKE ?)`;
      const keyword = `%${q}%`;
      params.push(keyword, keyword);
    }

    // Filters (e.g., phone=..., name=...)
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

    // Total query
    const countQuery = `SELECT COUNT(*) as total FROM customers ${whereClause}`;
    const [countResult] = await db.query(countQuery, params);
    const total = countResult[0].total;

    const query = `SELECT ${columns} FROM customers ${whereClause} ${orderClause} LIMIT ? OFFSET ?`;
    params.push(parsedLimit, parsedSkip);

    const [rows] = await db.query(query, [...params, parsedLimit, parsedSkip]);
    return {
      data: rows,
      total,
      limit: parsedLimit,
      skip: parsedSkip,
    };
  }

  async findById(id) {
    const query = "SELECT * FROM customers WHERE id = ?";
    const [rows] = await db.query(query, [id]);
    if (rows.length === 0) return null;
    return new Customer(rows[0]);
  }

  async create(customerData) {
    const query = "INSERT INTO customers (name, email, phone, address) VALUES (?, ?, ?, ?)";
    const [result] = await db.query(query, [
      customerData.name,
      customerData.email,
      customerData.phone,
      customerData.address,
    ]);
    return new Customer({ id: result.insertId, ...customerData });
  }

  async update(id, customerData) {
    const query = "UPDATE customers SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?";
    const [result] = await db.query(query, [
      customerData.name,
      customerData.email,
      customerData.phone,
      customerData.address,
      id,
    ]);
    if (result.affectedRows === 0) return null;
    return new Customer({ id, ...customerData });
  }

  async delete(id) {
    const query = "DELETE FROM customers WHERE id = ?";
    const [result] = await db.query(query, [id]);
    return result.affectedRows > 0;
  }
}

module.exports = new CustomerRepository();