const mongoose = require("mongoose");
const Product = require("../../server/models/Product");

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://namdevn972_db_user:5Rbtx4FPXtDlf5Py@cluster0.wwxbggu.mongodb.net/?appName=Cluster0";

// Connection cache for serverless environments
if (!global._mongoose) {
  global._mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (global._mongoose.conn) return global._mongoose.conn;
  if (!global._mongoose.promise) {
    global._mongoose.promise = mongoose
      .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then((m) => m.connection);
  }
  global._mongoose.conn = await global._mongoose.promise;
  return global._mongoose.conn;
}

module.exports = async (req, res) => {
  if (req.method === "OPTIONS") {
    // Preflight support
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await connectToDatabase();
    const products = await Product.find().lean();
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(200).json(products);
  } catch (err) {
    console.error("API /api/products error", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
