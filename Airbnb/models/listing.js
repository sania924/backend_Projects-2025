const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 👇 Define image sub-schema
const imageSchema = new Schema({
  filename: { type: String, required: true },
  url: { type: String, required: true }
}, { _id: false });

const listingSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  
  // 👇 Use image schema instead of String
  image: {
    type: imageSchema,
    default: {
      filename: 'default',
      url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&w=800&q=60'
    }
  },

  createdAt: { type: Date, default: Date.now }
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;
