module.exports = {
  '/api/users': {
    get: {
      tags: ['Users'],
      summary: 'Lấy danh sách người dùng (yêu cầu access token)',
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'Danh sách user'
        },
        401: { description: 'Token thiếu' },
        403: { description: 'Token không hợp lệ' }
      }
    }
  }
};
