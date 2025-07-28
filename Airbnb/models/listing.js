const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review'); // Import the Review model
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

  // 👇 Add reviews field to store references to Review documents
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }],

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
// middleware to delete reviews when a listing is deleted
listingSchema.post('findOneAndDelete',async(listing) => {
  if (listing) {
    await Review.deleteMany({
      _id: {
        $in: listing.reviews
      }
    });
  }
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;
