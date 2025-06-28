const express = require('express')
const app = express()
const mongoose = require('mongoose')
app.listen(3000, () => {
  console.log('Server is running on port 3000')
})  
app.get('/', (req, res) => {
  res.send('Hello World!')
})
mongoose.connect('mongodb+srv://sania924:924%40sania@backend.bngqy2c.mongodb.net/NodeAPI?retryWrites=true&w=majority&appName=Backend')
.then(() => {
  console.log('Connected to MongoDB')
}   ).catch(err => {
  console.error('Error connecting to MongoDB:', err)
})  
