FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port (3002 như bạn đang chạy local)
ENV PORT=3002
EXPOSE 3002

# Start app
CMD ["npm", "start"]
