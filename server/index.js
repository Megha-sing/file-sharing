import express from 'express';
import router from './routes/routes.js';
import cors from 'cors';
import DBConnection from './database/db.js';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

const app = express();
const __dirname = path.resolve(); 

// CORS setup
app.use(cors({
  origin: process.env.NODE_ENV === "production" 
    ? "https://file-sharing-vky4.onrender.com" // deployed frontend
    : "http://localhost:3000",            // dev frontend
  credentials: true
}));

// API routes
app.use('/', router);

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to DB
DBConnection();

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build'))); 
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
