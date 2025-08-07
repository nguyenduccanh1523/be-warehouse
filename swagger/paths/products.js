module.exports = {
  "/api/products": {
    get: {
      tags: ["Products"],
      summary: "Lấy danh sách sản phẩm (phân trang, tìm kiếm, lọc, sắp xếp)",
      parameters: [
        {
          name: "limit",
          in: "query",
          schema: { type: "integer", default: 10 },
          description: "Số lượng bản ghi",
        },
        {
          name: "skip",
          in: "query",
          schema: { type: "integer", default: 0 },
          description: "Bỏ qua bao nhiêu dòng đầu",
        },
        {
          name: "select",
          in: "query",
          schema: { type: "string" },
          description: "Chọn trường cần lấy, ví dụ: name,price",
        },
        {
          name: "sort",
          in: "query",
          schema: { type: "string" },
          description:
            "Sắp xếp theo trường (thêm `-` nếu giảm dần). Ví dụ: -price",
        },
        {
          name: "q",
          in: "query",
          schema: { type: "string" },
          description: "Tìm theo tên sản phẩm",
        },
        {
          name: "name",
          in: "query",
          schema: { type: "string" },
          description: "Lọc chính xác theo tên",
        },
        {
          name: "supplier_id",
          in: "query",
          schema: { type: "integer" },
          description: "Lọc theo supplier",
        },
        {
          name: "price",
          in: "query",
          schema: { type: "number" },
          description: "Lọc theo giá chính xác",
        },
      ],
      responses: {
        200: {
          description: "Danh sách sản phẩm",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  total: { type: "integer" },
                  limit: { type: "integer" },
                  skip: { type: "integer" },
                  data: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Product" },
                  },
                },
              },
            },
          },
        },
      },
    },
    post: {
      tags: ["Products"],
      summary: "Tạo sản phẩm mới",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ProductCreate" },
          },
        },
      },
      responses: {
        201: {
          description: "Tạo thành công",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Product" },
            },
          },
        },
      },
    },
  },

  "/api/products/{id}": {
    get: {
      tags: ["Products"],
      summary: "Lấy chi tiết sản phẩm",
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "integer" } },
      ],
      responses: {
        200: {
          description: "Chi tiết sản phẩm",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Product" },
            },
          },
        },
        404: {
          description: "Không tìm thấy",
        },
      },
    },
    put: {
      tags: ["Products"],
      summary: "Cập nhật sản phẩm",
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "integer" } },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ProductCreate" },
          },
        },
      },
      responses: {
        200: {
          description: "Cập nhật thành công",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Product" },
            },
          },
        },
      },
    },
    delete: {
      tags: ["Products"],
      summary: "Xoá sản phẩm",
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "integer" } },
      ],
      responses: {
        200: {
          description: "Xoá thành công",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
  },
};
