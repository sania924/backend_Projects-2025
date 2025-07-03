const mongoose= require('mongoose');
const Schema= mongoose.Schema;

const listingSchema= new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  image: { type: String,
    default: 'https://unsplash.com/photos/a-forest-filled-with-lots-of-trees-next-to-a-lake-fmlZvLSxXj8', // Default image URL
    set:(v) => {v==="" ? 'https://unsplash.com/photos/a-forest-filled-with-lots-of-trees-next-to-a-lake-fmlZvLSxXj8' : v} // Set default if empty
    },  
  createdAt: { type: Date, default: Date.now }
});

const Listing= mongoose.model('Listing', listingSchema);
module.exports= Listing;
// This code defines a Mongoose schema and model for an Airbnb listing.
// The schema includes fields for title, description, price, location, and createdAt.   