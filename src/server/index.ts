import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { config } from './config/environment.js';
import { PrismaClient } from '@prisma/client';

// Routes
import authRoutes from './routes/auth.routes.js';
import memberRoutes from './routes/member.routes.js';
import groupRoutes from './routes/group.routes.js';
import serviceRoutes from './routes/service.routes.js';
import paymentRoutes from './routes/payment.routes.js';

// Load environment variables
dotenv.config();

const app = express();

// Initialize Prisma
export const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Route registration
app.use('/api/auth', authRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/payments', paymentRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const port = config.app.port || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Handle cleanup
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});