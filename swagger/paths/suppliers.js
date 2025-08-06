module.exports = {
  "/api/suppliers": {
    get: {
      tags: ["Suppliers"],
      summary: "Lấy danh sách nhà cung cấp (có phân trang và chọn trường)",
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
          description: "Tìm kiếm theo `name` hoặc `address`",
        },
        {
          name: "name",
          in: "query",
          schema: { type: "string", default: "" },
          description: "Lọc chính xác theo tên",
        },
        {
          name: "phone",
          in: "query",
          schema: { type: "string", default: "" },
          description: "Lọc chính xác theo số điện thoại",
        },
      ],
      responses: {
        200: {
          description: "Danh sách nhà cung cấp",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Supplier" },
              },
            },
          },
        },
      },
    },
    post: {
      tags: ["Suppliers"],
      summary: "Tạo nhà cung cấp mới",
      // security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/SupplierInput",
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
                $ref: "#/components/schemas/Supplier",
              },
            },
          },
        },
      },
    },
  },

  "/api/suppliers/{id}": {
    get: {
      tags: ["Suppliers"],
      summary: "Lấy thông tin một nhà cung cấp theo ID",
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
          description: "Thông tin nhà cung cấp",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Supplier",
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
      tags: ["Suppliers"],
      summary: "Cập nhật nhà cung cấp theo ID",
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
              $ref: "#/components/schemas/SupplierInput",
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
      tags: ["Suppliers"],
      summary: "Xoá nhà cung cấp theo ID",
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
