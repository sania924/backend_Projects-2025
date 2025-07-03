const mongoose = require('mongoose');
const initdata= require('./data');
const Listing = require('../models/listing');

// Connect to MongoDB with Mongoose using then
mongoose.connect('mongodb://localhost:27017/airbnb')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });

// Function to seed the database with initial data
const initDB=async () => {
    try {
        // Clear existing listings
        await Listing.deleteMany({});
        console.log('Existing listings cleared');

        // Insert initial data
        const result = await Listing.insertMany(initdata.data);
        console.log('Database seeded with initial data:', result);
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.connection.close();
    }
}

// Call the initDB function to seed the database
initDB();