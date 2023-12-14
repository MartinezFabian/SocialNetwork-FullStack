import Express from 'express';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import likeRoutes from './routes/likes.js';
import commentRoutes from './routes/comments.js';
import authRoutes from './routes/auth.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Setup express
const app = Express();
const port = 8800;

// Middlewares
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', true);
  next();
});

app.use(Express.json());
app.use(cors({ origin: 'http://localhost:3000' })); // Client is running on port 3000
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}: http://localhost:${port}`);
});
