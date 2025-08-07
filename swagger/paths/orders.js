module.exports = {
  "/api/orders": {
    get: {
      tags: ["Orders"],
      summary: "Lấy danh sách đơn hàng (phân trang, tìm kiếm, lọc, sắp xếp)",
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
            "Sắp xếp theo trường (thêm `-` nếu giảm dần). Ví dụ: -total_amount",
        },
        {
          name: "order_date",
          in: "query",
          schema: { type: "date" },
          description: "Lọc theo ngày đặt hàng",
        },
        {
          name: "customer_id",
          in: "query",
          schema: { type: "integer" },
          description: "Lọc theo ID khách hàng",
        },
        {
          name: "total_amount",
          in: "query",
          schema: { type: "number" },
          description: "Lọc theo tổng số tiền",
        }
      ],
      responses: {
        200: {
          description: "Danh sách đơn hàng",
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
                    items: { $ref: "#/components/schemas/Order" },
                  },
                },
              },
            },
          },
        },
      },
    },
    post: {
      tags: ["Orders"],
      summary: "Tạo đơn hàng mới",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/OrderInput" },
          },
        },
      },
      responses: {
        201: {
          description: "Tạo thành công",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Order" },
            },
          },
        },
      },
    },
  },
  "/api/orders/{id}": {
    get: {
      tags: ["Orders"],
      summary: "Lấy thông tin đơn hàng theo ID",
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "integer" } },
      ],
      responses: {
        200: {
          description: "Thông tin đơn hàng",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Order" },
            },
          },
        },
        404: {
          description: "Không tìm thấy đơn hàng",
        },
      },
    },
    put: {
      tags: ["Orders"],
      summary: "Cập nhật đơn hàng",
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "integer" } },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/OrderInput" },
          },
        },
      },
      responses: {
        200: {
          description: "Cập nhật thành công",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Order" },
            },
          },
        },
      },
    },
    delete: {
      tags: ["Orders"],
      summary: "Xoá đơn hàng",
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
