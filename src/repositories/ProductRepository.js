const db = require("../config/db");
const Product = require("../models/Product");

class ProductRepository {
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

    if (q) {
      whereClause += ` AND (name LIKE ?)`;
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

    const countQuery = `SELECT COUNT(*) as total FROM products ${whereClause}`;
    const [countResult] = await db.query(countQuery, params);
    const total = countResult[0].total;

    const query = `SELECT ${columns} FROM products ${whereClause} ${orderClause} LIMIT ? OFFSET ?`;
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
    const query = "SELECT * FROM products WHERE id = ?";
    const [rows] = await db.query(query, [id]);
    if (rows.length === 0) return null;
    return new Product(rows[0]);
  }

  async create(product) {
    const query =
      "INSERT INTO products (name, quantity, price, supplier_id) VALUES (?, ?, ?, ?)";
    const [result] = await db.query(query, [
      product.name,
      product.quantity,
      product.price,
      product.supplier_id,
    ]);
    return new Product({
      id: result.insertId,
      ...product,
    });
  }

  async update(id, product) {
    const query =
      "UPDATE products SET name = ?, quantity = ?, price = ?, supplier_id = ? WHERE id = ?";
    const [result] = await db.query(query, [
      product.name,
      product.quantity,
      product.price,
      product.supplier_id,
      id,
    ]);
    return result.affectedRows > 0 ? new Product({ id, ...product }) : null;
  }

  async delete(id) {
    const query = "DELETE FROM products WHERE id = ?";
    const [result] = await db.query(query, [id]);
    return result.affectedRows > 0;
  }
}

module.exports = new ProductRepository();
