const express= require('express');
const app = express();
app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', __dirname + '/views'); // Set the views directory
const mongoose = require('mongoose');
const Listing = require('./models/listing'); 
// Connect to MongoDB with Mongoose using then
mongoose.connect('mongodb://localhost:27017/airbnb')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });


app.get('/', (req, res) => {        
    res.send('Welcome to Airbnb!');
});

// Listing Routes
// index route to get all listings
app.get('/listings', async (req, res) => {
    try {
        const allListings = await Listing.find({});
        res.render('listing/index', { listings: allListings });
    } catch (err) {
        console.error('Error fetching listings:', err);
        res.status(500).send('Internal Server Error');
    }
});
// show route to get a single listing by ID
app.get('/listings/:id', async (req, res) => {
  
        const listing = await Listing.findById(req.params.id);
      
        res.render('listing/show', { listing });
    
});












app.listen(3000, () => {
    console.log('Server is running on port 3000');
});