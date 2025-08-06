module.exports = {
  "/api/users/register": {
    post: {
      tags: ["Auth"],
      summary: "Đăng ký người dùng mới",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                username: {
                  type: "string",
                },
                password: {
                  type: "string",
                },
              },
              required: ["username", "password"],
            },
          },
        },
      },
      responses: {
        201: {
          description: "Đăng ký thành công",
        },
        400: {
          description: "Yêu cầu không hợp lệ",
        },
      },
    },
  },
  "/api/users/login": {
    post: {
      tags: ["Auth"],
      summary: "Đăng nhập và lấy access token & refresh token",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                username: { type: "string" },
                password: { type: "string" },
              },
              required: ["username", "password"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "Đăng nhập thành công",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  accessToken: { type: "string" },
                  refreshToken: { type: "string" },
                },
              },
            },
          },
        },
        401: { description: "Sai thông tin đăng nhập" },
      },
    },
  },
  "/api/users/refresh-token": {
    post: {
      tags: ["Auth"],
      summary: "Lấy lại access token mới bằng refresh token",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                refreshToken: {
                  type: "string",
                },
              },
              required: ["refreshToken"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "Trả về access token mới",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  accessToken: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        403: {
          description: "Refresh token không hợp lệ hoặc hết hạn",
        },
      },
    },
  },
};
