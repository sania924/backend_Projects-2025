require("dotenv").config();
const connectDb = require('./db/connect');
const Product = require('./models/product');
const PJSON = require('./product.json');

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    await Product.deleteMany(); // Optional: clear old data
    await Product.create(PJSON);
    console.log('Success');
    process.exit(0);
  } catch (error) {
    console.log('Error seeding data:', error);
    process.exit(1);
  }
};

start(); // ✅ Don't forget to call it
