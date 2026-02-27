const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const Product = require('./models/Product');
const productsRouter = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 5001;
// Use environment variable for MongoDB connection; fallback to the user's provided Atlas URI
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://namdevn972_db_user:5Rbtx4FPXtDlf5Py@cluster0.wwxbggu.mongodb.net/?appName=Cluster0';

app.use(cors());
app.use(express.json());

app.use('/api/products', productsRouter);

// Serve client build if exists
const clientBuildPath = path.join(__dirname, '..', 'client', 'dist');
if (require('fs').existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');

    // Seed DB with products if empty
    const count = await Product.countDocuments();
    if (count === 0) {
      const seed = [
        { name: 'Beads', category: 'Beads', imageUrl: '', description: 'Various beads' },
        { name: 'Nylon Thread', category: 'Threads', imageUrl: '', description: 'Strong nylon thread' },
        { name: 'Jewelry Hooks', category: 'Hooks', imageUrl: '', description: 'Earrings hooks' },
        { name: 'Jump Rings', category: 'Rings', imageUrl: '', description: 'Jump rings' },
        { name: 'B7000 Glue', category: 'Glue', imageUrl: '', description: 'Multi-purpose glue' },
        { name: 'Crystal Beads', category: 'Beads', imageUrl: '', description: 'Sparkling crystals' },
        { name: 'Elastic Thread', category: 'Threads', imageUrl: '', description: 'Elastic cord' },
        { name: 'Jewelry Tools', category: 'Tools', imageUrl: '', description: 'Pliers and tools' }
      ];
      await Product.insertMany(seed);
      console.log('Seeded products');
    }

    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error', err);
    process.exit(1);
  });

  //5Rbtx4FPXtDlf5Py

  //mongodb+srv://namdevn972_db_user:<db_password>@cluster0.wwxbggu.mongodb.net/?appName=Cluster0
