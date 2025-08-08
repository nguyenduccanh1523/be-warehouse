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

    // Map tên field -> tên cột đầy đủ
    const columnMap = {
      id: "products.id",
      name: "products.name",
      quantity: "products.quantity",
      price: "products.price",
      supplier_id: "products.supplier_id",
      supplier_name: "suppliers.name",
      supplier_phone: "suppliers.phone",
      supplier_address: "suppliers.address",
    };

    const sortMap = {
      id: "products.id",
      name: "products.name",
      price: "products.price",
      quantity: "products.quantity",
      supplier_name: "suppliers.name",
    };

    // Cột SELECT
    let columns;
    if (select && select !== "*") {
      const mapped = select
        .split(",")
        .map((s) => s.trim())
        .map((col) => (columnMap[col] ? `${columnMap[col]} AS ${col}` : null))
        .filter(Boolean);

      // Luôn bổ sung thông tin supplier
      mapped.push(
        "suppliers.id AS supplier_id_real",
        "suppliers.name AS supplier_name",
        "suppliers.phone AS supplier_phone",
        "suppliers.address AS supplier_address"
      );

      columns = mapped.join(", ");
    } else {
      columns = [
        "products.id",
        "products.name",
        "products.quantity",
        "products.price",
        "products.supplier_id",
        "suppliers.id AS supplier_id_real",
        "suppliers.name AS supplier_name",
        "suppliers.phone AS supplier_phone",
        "suppliers.address AS supplier_address",
      ].join(", ");
    }

    // WHERE clause
    let whereClause = "WHERE 1";
    const params = [];

    if (q) {
      whereClause += ` AND products.name LIKE ?`;
      params.push(`%${q}%`);
    }

    for (const [key, value] of Object.entries(filters)) {
      if (["limit", "skip", "select", "sort", "q"].includes(key)) continue;
      const col = columnMap[key];
      if (!col) continue;
      whereClause += ` AND ${col} = ?`;
      params.push(value);
    }

    // ORDER BY
    let orderClause = "";
    if (sort) {
      const direction = sort.startsWith("-") ? "DESC" : "ASC";
      const column = sort.replace(/^[-+]/, "");
      const col = sortMap[column];
      if (col) orderClause = `ORDER BY ${col} ${direction}`;
    }

    const fromClause = `FROM products LEFT JOIN suppliers ON products.supplier_id = suppliers.id`;

    // Query đếm tổng
    const countQuery = `SELECT COUNT(*) as total ${fromClause} ${whereClause}`;
    const [countResult] = await db.query(countQuery, [...params]);
    const total = countResult[0].total;

    // Query data
    const query = `SELECT ${columns} ${fromClause} ${whereClause} ${orderClause} LIMIT ? OFFSET ?`;
    const [rows] = await db.query(query, [...params, parsedLimit, parsedSkip]);

    // Format kết quả
    const data = rows.map(
      ({
        supplier_id_real,
        supplier_name,
        supplier_phone,
        supplier_address,
        ...productFields
      }) => ({
        ...productFields,
        supplier: supplier_id_real
          ? {
              id: supplier_id_real,
              name: supplier_name,
              phone: supplier_phone,
              address: supplier_address,
            }
          : null,
      })
    );

    return {
      data,
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
