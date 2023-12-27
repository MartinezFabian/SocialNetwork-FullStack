import Express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import likeRoutes from './routes/likes.js';
import commentRoutes from './routes/comments.js';
import authRoutes from './routes/auth.js';
import relationshipRoutes from './routes/relationship.js';

// Setup express
const app = Express();
const port = 8800;

// Middlewares
const corsOptions = {
  origin: 'http://localhost:5173', // Client is running on port 5173
  credentials: true,
};

app.use(cors(corsOptions));
app.use(Express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/relationship', relationshipRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}: http://localhost:${port}`);
});
