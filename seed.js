require('dotenv').config();
const mongoose = require('mongoose');
const { Product } = require('./models/ProductModel'); // Ensure filename matches your model
const connectDB = require('./config/db');

const products = [
  {
    title: "Samsung Galaxy S24 FE",
    description: "Experience the next generation of Galaxy AI with the S24 FE. Features a stunning display and pro-grade camera.",
    price: 699,
    rating: 4.8,
    category: "Smartphone",
    stock: 50,
    avatar: "1750504738284-Samsung-GalaxyS24-FE.png" 
  },
  {
    title: "iPhone 15 Pro Max",
    description: "Forged in titanium. Features the groundbreaking A17 Pro chip, customizable Action button, and the most powerful iPhone camera system ever.",
    price: 1199,
    rating: 4.9,
    category: "Smartphone",
    stock: 30,
    avatar: "1758208252195-iPhone-15-Pro-Max-Black-Titanium1-600x525.png"
  },
  {
    title: "Galaxy Book4 Pro",
    description: "Boost your productivity with the Galaxy Book4 Pro. Ultra-slim design meets powerful performance with Intel Core Ultra processors.",
    price: 1449,
    rating: 4.7,
    category: "Laptop",
    stock: 20,
    avatar: "1751689123638-in-galaxy-book4-pro-16-inch-np960-np960xgk-kg1in-539965055.webp"
  },
  {
    title: "Google Pixel 10 Pro XL",
    description: "The smartest Pixel yet. With Gemini built-in, it helps you do more, faster. Incredible camera and all-day battery life.",
    price: 1099,
    rating: 4.6,
    category: "Smartphone",
    stock: 40,
    avatar: "1758253320909-Pixel10ProXL-Moonstone-Front.jpg"
  },
  {
    title: "Galaxy Buds3 Pro",
    description: "Immerse yourself in crystal clear sound with Active Noise Cancellation and a comfortable, secure fit for all-day listening.",
    price: 249,
    rating: 4.5,
    category: "Audio",
    stock: 100,
    avatar: "1751689392732-in-galaxy-buds3-pro-r630-sm-r630nzaainu-542134810.webp"
  },
  {
    title: "Samsung Z Fold 7",
    description: "Unfold a world of possibilities. The massive main screen offers a tablet-like experience in a device that fits in your pocket.",
    price: 1799,
    rating: 4.8,
    category: "Smartphone",
    stock: 15,
    avatar: "1757413334224-samsung z fold 7.jpg"
  },
  {
    title: "Google Pixel 10 Pro Fold",
    description: "Thin, durable, and powerful. The Pixel Fold brings the best of Google AI to a foldable form factor.",
    price: 1799,
    rating: 4.7,
    category: "Smartphone",
    stock: 10,
    avatar: "1763436668164-Google-Pixel-10-Pro-Fold-Moonstone.webp"
  },
  {
    title: "Galaxy Watch 8",
    description: "Your advanced health partner. Track sleep, fitness, and vital stats with precision right from your wrist.",
    price: 399,
    rating: 4.6,
    category: "Wearable",
    stock: 60,
    avatar: "1753325224078-in-galaxy-watch8-l325-sm-l325fdaains-547660314.avif"
  }
];

const seedDB = async () => {
    try {
        await connectDB();
        
        // Clear existing products to avoid duplicates
        await Product.deleteMany({});
        console.log('🧹 Cleared existing products');

        // Insert new products
        await Product.insertMany(products);
        console.log('🌱 Database Seeded Successfully!');
        
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();