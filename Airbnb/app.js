const express= require('express');
const app = express();
const mongoose = require('mongoose');

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
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});