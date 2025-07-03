const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        maxlength: [100, 'Product name cannot exceed 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Product price cannot be negative']
    },
  featured:{
    type: Boolean,
    default: false
  },
  rating:{
    type: Number,
    default: 4.5,
   
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
    company: {
        type: String,
        enum: {
        values: ['iphone', 'samsung', 'nokia', 'oppo'],
        message: '{VALUE} is not a valid company'
        },
       
    }
}, { timestamps: true });
module.exports = mongoose.model('Product', productSchema);
// This code defines a Mongoose schema for a product, including fields for name, price, featured status, rating, creation date, and company.
// The 'enum' validation ensures that only the specified companies can be used, providing a controlled set of options for the company field.
