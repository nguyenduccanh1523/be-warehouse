module.exports = {
  "/api/orderitems": {
    get: {
      tags: ["OrderItems"],
      summary: "Lấy danh sách chi tiết sản phẩm trong đơn hàng (phân trang, tìm kiếm, lọc, sắp xếp)",
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
          name: "order_id",
          in: "query",
          schema: { type: "integer" },
          description: "Lọc theo ID đơn hàng",
        },
        {
          name: "product_id",
          in: "query",
          schema: { type: "integer" },
          description: "Lọc theo ID sản phẩm",
        }
      ],
      responses: {
        200: {
          description: "Danh sách chi tiết sản phẩm trong đơn hàng",
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
                    items: { $ref: "#/components/schemas/OrderItem" },
                  },
                },
              },
            },
          },
        },
      },
    },
    post: {
      tags: ["OrderItems"],
      summary: "Tạo chi tiết sản phẩm trong đơn hàng mới",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/OrderItemInput" },
          },
        },
      },
      responses: {
        201: {
          description: "Tạo thành công",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/OrderItem" },
            },
          },
        },
      },
    },
  },
  "/api/orderitems/{id}": {
    get: {
      tags: ["OrderItems"],
      summary: "Lấy chi tiết sản phẩm trong đơn hàng theo ID",
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "integer" } },
      ],
      responses: {
        200: {
          description: "Chi tiết sản phẩm trong đơn hàng",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/OrderItem" },
            },
          },
        },
        404: {
          description: "Không tìm thấy chi tiết sản phẩm trong đơn hàng",
        },
      },
    },
    put: {
      tags: ["OrderItems"],
      summary: "Cập nhật chi tiết sản phẩm trong đơn hàng",
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "integer" } },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/OrderItemUpdate" },
          },
        },
      },
      responses: {
        200: {
          description: "Cập nhật thành công",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/OrderItem" },
            },
          },
        },
      },
    },
    delete: {
      tags: ["OrderItems"],
      summary: "Xoá chi tiết sản phẩm trong đơn hàng",
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
