require('dotenv').config();
const http = require('http');
const app = require('./app');
const connectDB = require('./config/db');
const { connectRedis } = require('./config/redis');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Connect to databases first
  await connectDB();
  await connectRedis();

  const server = http.createServer(app);

  // Socket.IO will attach to this server (Phase 2)
  // initSocket(server);

  server.listen(PORT, () => {
    logger.info(`🚀 Server running on port ${PORT}`);
  });
};

startServer();