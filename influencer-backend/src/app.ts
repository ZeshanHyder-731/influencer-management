import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import influencerRoutes from './routes/influencerRoutes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/influencers', influencerRoutes);

// MongoDB connection
const mongoURI = 'mongodb://localhost:27017/influencerDB';
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

export default app;