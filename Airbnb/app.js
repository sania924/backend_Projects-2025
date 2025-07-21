const express= require('express');
const app = express();
const ejsMate = require('ejs-mate'); // EJS layout engine
app.engine('ejs', ejsMate); // Use ejsMate for EJS templating
app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', __dirname + '/views'); // Set the views directory
const wrapAsync = require('./utils/wrapAsyn'); // Import the catchAsync utility
const ExpressError = require('./utils/ExpressError.js'); // Import the ExpressError class
app.use(express.static(__dirname + '/public')); // Serve static files from the public directory
const path = require('path'); // Path module for handling file paths
app.use(express.json()); // Parse JSON bodies
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
app.get('/listings', wrapAsync( async (req, res) => {
    try {
        const allListings = await Listing.find({});
        res.render('listing/index.ejs', { listings: allListings });
    } catch (err) {
        console.error('Error fetching listings:', err);
        res.status(500).send('Internal Server Error');
    }
}));
// new route to show form for creating a new listing
app.get('/listings/new', (req, res) => {
    res.render('listing/new.ejs', { listing: new Listing() });
});

// show route to get a single listing by ID
app.get('/listings/:id', wrapAsync( async (req, res) => {
  
        const listing = await Listing.findById(req.params.id);
      
        res.render('listing/show.ejs', { listing });
    
}));
// create route to handle form submission and create a new listing
app.post('/listings', wrapAsync( async (req, res) => {
  console.log("Request body:", req.body); // ← LOG THIS

  const newListing = new Listing(req.body.listing);
  await newListing.save();

  res.redirect('/listings');
}));

// edit route to show form for editing a listing
app.get('/listings/:id/edit', wrapAsync( async (req, res) => { 
    const listing = await Listing.findById(req.params.id);
    res.render('listing/edit.ejs', { listing });
}));

// update route to handle form submission and update a listing
app.put('/listings/:id', wrapAsync( async (req, res) => {
    const updatedListing = await Listing.findByIdAndUpdate(req.params.id, {...req.body.listing}, { new: true });
    res.redirect(`/listings/${updatedListing._id}`);
}));
// delete route to delete a listing
app.delete('/listings/:id', wrapAsync( async (req, res) => {
    try {
        await Listing.findByIdAndDelete(req.params.id);
        console.log(`Listing with ID ${req.params.id} deleted`);
        res.redirect('/listings');
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to delete listing");
    }
}));
// 404 catch‑all
// app.all('*', (req, res, next) => {
//     console.log('USER API CALLED');
//     next();
// });

// // error‑handler — must use exactly 4 args (err, req, res, next)
// app.use((err, req, res, next) => {
//   let { statusCode = 500, message = 'Something went wrong' } = err;
//   res.status(statusCode).render('error', { statusCode, message });
// // console.log(ExpressError);
// });

app.use((req, res) => {
  res.status(404).render('error', {
    statusCode: 404,
    message: 'Page Not Found'
  });
});

// 2) Error‑Handling Middleware — catches any next(err) you throw.
app.use((err, req, res, next) => {
  const { statusCode = 500, message = 'Something went wrong' } = err;
  res.status(statusCode).render('error', { statusCode, message });
});


// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});