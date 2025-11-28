require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

// Initialize App
const app = express();

// 1. Connect to Database
connectDB();

// 2. Middleware (UPDATED: Allow Everyone)
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: true, // <--- This allows ANY URL (localhost, 127.0.0.1, etc.)
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
}));

// 3. Routes
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.json({ message: '🚀 EliteHub Backend is Running!' });
});

// 4. Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});