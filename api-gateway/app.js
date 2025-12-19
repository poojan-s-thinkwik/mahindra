import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.path}`);
  next();
});

app.use('/', express.static(path.join(__dirname, '../public/build')));

// Define Routes for Different Services
app.use('/auth', createProxyMiddleware({ target: 'http://localhost:8081/api/v1', changeOrigin: true }));
app.use('/master', createProxyMiddleware({ target: 'http://localhost:8080/api/v1', changeOrigin: true }));

// Start API Gateway
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
