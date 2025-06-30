const express = require('express')
const app = express()
const mongoose = require('mongoose')
app.use(express.json());
const Product = require('./models/product.model');
app.listen(3000, () => {
  console.log('Server is running on port 3000')
})  
app.get('/', (req, res) => {
  res.send('Hello World!')
})
 app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});


app.post('/api/products', async (req, res) => {
  try {
    const product =  await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});
// update product
app.put('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});
// delete product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
});

mongoose.connect('mongodb+srv://sania924:924%40sania@backend.bngqy2c.mongodb.net/NodeAPI?retryWrites=true&w=majority&appName=Backend')
.then(() => {
  console.log('Connected to MongoDB')
}   ).catch(err => {
  console.error('Error connecting to MongoDB:', err)
})  
