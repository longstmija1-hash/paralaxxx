require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const cron = require('node-cron');

const db = require('./db');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const courseRoutes = require('./routes/courses');
const homeworkRoutes = require('./routes/homeworks');
const gamificationRoutes = require('./routes/gamification');
const shopRoutes = require('./routes/shop');
const subscriptionRoutes = require('./routes/subscriptions');
const { runLifeChecker } = require('./services/lifeChecker');

const app = express();
const server = http.createServer(app);

// ─── Socket.io ────────────────────────────────────────────────────────────────
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

// Make io available in request handlers via app.locals
app.locals.io = io;

io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  // Student joins their personal room to receive targeted events
  socket.on('join', (userId) => {
    socket.join(`user_${userId}`);
    console.log(`User ${userId} joined room user_${userId}`);
  });

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json());

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/homeworks', homeworkRoutes);
app.use('/api/gamification', gamificationRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Global error handler
app.use((err, req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// ─── Cron Jobs ────────────────────────────────────────────────────────────────
// Run life checker every day at midnight
cron.schedule('0 0 * * *', async () => {
  console.log('[CRON] Running Life Checker...');
  await runLifeChecker(io);
});

// Run at start of each month to reset lives
cron.schedule('0 0 1 * *', async () => {
  console.log('[CRON] Resetting lives for new month...');
  await db.query(`
    UPDATE gamification
    SET lives_count = $1, reset_at = DATE_TRUNC('month', NOW()) + INTERVAL '1 month'
    WHERE reset_at <= NOW()
  `, [process.env.LIVES_PER_MONTH || 3]);
});

// ─── Start ─────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`✅ CodeSchool Backend running at http://localhost:${PORT}`);
  console.log(`   Socket.io ready`);
  console.log(`   Life Checker cron: daily at midnight`);
});
