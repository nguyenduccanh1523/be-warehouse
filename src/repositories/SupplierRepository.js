const db = require("../config/db");
const Suppiler = require("../models/Supplier");

class SupplierRepository {
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

    //Search
    if (q) {
      whereClause += ` AND (name LIKE ? OR address LIKE ?)`;
      const keyword = `%${q}%`;
      params.push(keyword, keyword);
    }

    //Filters (ví dụ: phone=..., name=...)
    for (const [key, value] of Object.entries(filters)) {
      if (["limit", "skip", "select", "sort", "q"].includes(key)) continue;
      whereClause += ` AND \`${key}\` = ?`;
      params.push(value);
    }

    //Sort
    let orderClause = "";
    if (sort) {
      const direction = sort.startsWith("-") ? "DESC" : "ASC";
      const column = sort.replace(/^[-+]/, "");
      orderClause = `ORDER BY \`${column}\` ${direction}`;
    }

    //Total query
    const countQuery = `SELECT COUNT(*) as total FROM suppliers ${whereClause}`;
    const [countResult] = await db.query(countQuery, params);
    const total = countResult[0].total;

    const query = `SELECT ${columns} FROM suppliers ${whereClause} ${orderClause} LIMIT ? OFFSET ?`;
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
    const [rows] = await db.query("SELECT * FROM suppliers WHERE id = ?", [id]);
    if (rows.length === 0) return null;
    const row = rows[0];
    return new Suppiler(row.id, row.name, row.phone, row.address);
  }

  async create(supplier) {
    const [result] = await db.query(
      "INSERT INTO suppliers (name, phone, address) VALUES (?, ?, ?)",
      [supplier.name, supplier.phone, supplier.address]
    );
    return new Suppiler(
      result.insertId,
      supplier.name,
      supplier.phone,
      supplier.address
    );
  }

  async update(id, supplier) {
    const [result] = await db.query(
      "UPDATE suppliers SET name = ?, phone = ?, address = ? WHERE id = ?",
      [supplier.name, supplier.phone, supplier.address, id]
    );
    if (result.affectedRows === 0) return null;
    return new Suppiler(id, supplier.name, supplier.phone, supplier.address);
  }

  async delete(id) {
    const [result] = await db.query("DELETE FROM suppliers WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
}

module.exports = new SupplierRepository();
