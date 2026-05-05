const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URL = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('database connected!!');

    const adminExists = await User.findOne({ username: 'admin' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const admin = new User({ username: 'admin', password: hashedPassword, role: 'admin' });
      await admin.save();
      console.log('Admin user created: username: admin, password: admin123');
    }

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('failed to connect', error);
  }
}

startServer();

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const contentRoutes = require('./routes/content');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/content', contentRoutes);
