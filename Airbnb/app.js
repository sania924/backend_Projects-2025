const express= require('express');
const app = express();
app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', __dirname + '/views'); // Set the views directory
app.use(express.urlencoded({ extended: true }));
const methodOverride = require('method-override');
app.use(methodOverride('_method')); // Allow PUT and DELETE methods in forms
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
// new route to show form for creating a new listing
app.get('/listings/new', (req, res) => {
    res.render('listing/new.ejs', { listing: new Listing() });
});

// show route to get a single listing by ID
app.get('/listings/:id', async (req, res) => {
  
        const listing = await Listing.findById(req.params.id);
      
        res.render('listing/show', { listing });
    
});
// create route to handle form submission and create a new listing
app.post('/listings', async (req, res) => {
  console.log("Request body:", req.body); // ← LOG THIS

  const newListing = new Listing(req.body.listing);
  await newListing.save();

  res.redirect('/listings');
});

// edit route to show form for editing a listing
app.get('/listings/:id/edit', async (req, res) => { 
    const listing = await Listing.findById(req.params.id);
    res.render('listing/edit', { listing });
});

// update route to handle form submission and update a listing
app.put('/listings/:id', async (req, res) => {
    const updatedListing = await Listing.findByIdAndUpdate(req.params.id, {...req.body.listing}, { new: true });
    res.redirect(`/listings/${updatedListing._id}`);
});
// delete route to delete a listing
app.delete('/listings/:id', async (req, res) => {
    try {
        await Listing.findByIdAndDelete(req.params.id);
        console.log(`Listing with ID ${req.params.id} deleted`);
        res.redirect('/listings');
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to delete listing");
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});