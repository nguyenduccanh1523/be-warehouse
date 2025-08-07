module.exports = {
  "/api/customers": {
    get: {
      tags: ["Customers"],
      summary: "Lấy danh sách khách hàng (có phân trang và chọn trường)",
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
          schema: { type: "string", default: "*" },
          description:
            "Tên các trường cần lấy (cách nhau bởi dấu phẩy). VD: name,address",
        },
        {
          name: "sort",
          in: "query",
          schema: { type: "string", default: "" },
          description:
            "Sắp xếp theo cột (thêm dấu `-` nếu muốn giảm dần), ví dụ: `sort=name` hoặc `sort=-phone`",
        },
        {
          name: "q",
          in: "query",
          schema: { type: "string", default: "" },
          description: "Tìm kiếm theo `name` hoặc `email`",
        },
        {
          name: "name",
          in: "query",
          schema: { type: "string", default: "" },
          description: "Lọc chính xác theo tên",
        },
        {
          name: "email",
          in: "query",
          schema: { type: "string", default: "" },
          description: "Lọc chính xác theo email",
        },
      ],
      responses: {
        200: {
          description: "Danh sách khách hàng",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Customer" },
              },
            },
          },
        },
      },
    },
    post: {
      tags: ["Customers"],
      summary: "Tạo khách hàng mới",
      // security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CustomerInput",
            },
          },
        },
      },
      responses: {
        201: {
          description: "Tạo thành công",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Customer",
              },
            },
          },
        },
      },
    },
  },

  "/api/customers/{id}": {
    get: {
      tags: ["Customers"],
      summary: "Lấy thông tin một khách hàng theo ID",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "integer" },
        },
      ],
      responses: {
        200: {
          description: "Thông tin khách hàng",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Customer",
              },
            },
          },
        },
        404: {
          description: "Không tìm thấy",
        },
      },
    },
    put: {
      tags: ["Customers"],
      summary: "Cập nhật khách hàng theo ID",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "integer" },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CustomerInput",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Cập nhật thành công",
        },
        404: {
          description: "Không tìm thấy",
        },
      },
    },
    delete: {
      tags: ["Customers"],
      summary: "Xoá khách hàng theo ID",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "integer" },
        },
      ],
      responses: {
        200: {
          description: "Xoá thành công",
        },
        404: {
          description: "Không tìm thấy",
        },
      },
    },
  },
};
