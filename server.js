require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

// Import All Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes'); // Ensure this file exists
const cartRoutes = require('./routes/cartRoutes');       // Ensure this file exists
const orderRoutes = require('./routes/orderRoutes');     // Ensure this file exists
const userRoutes = require('./routes/userRoutes');       // We will create this next

const app = express();

// 1. Connect Database
connectDB();

// 2. Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: true, // Allows localhost and 127.0.0.1
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
}));

// 3. Register Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes); // New User Profile Route

app.get('/', (req, res) => {
    res.json({ message: '🚀 EliteHub Backend is Running Full Power!' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});