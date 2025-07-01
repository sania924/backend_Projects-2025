require('dotenv').config();
const express=require('express');
const app=express();
const PORT=process.env.PORT || 3000;
const connectDB = require('./db/connect');
const MONGO_URI = process.env.MONGO_URI; // <-- Add this line

// Middleware
const productRouter = require('./routes/product');
app.get ('/', (req, res) => {   
    res.send("hello world")
});
app.use('/api/products', productRouter);
const start = async () => {
try{
    await connectDB(MONGO_URI);
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
} catch(error){
console.log(error);
}
}
start();
