const Product = require('../models/product')
getAllProducts = async (req, res) => {
    try {
        //add pagination
        const { featured, company, name, sort, page = 1, limit = 10 } = req.query;
        const queryObject = {};
        if (featured) {
            queryObject.featured = featured === 'true';
        }
        if (company) {
            queryObject.company = company;
        }
        if (name) {
            queryObject.name = { $regex: name, $options: 'i' };
        }
        let result = Product.find(queryObject);
        if (sort) {
            const sortList = sort.split(',').join(' ');
            result = result.sort(sortList);
        }
        let pageNumber = parseInt(page);
        let pageSize = parseInt(limit);
        const skip = (pageNumber - 1) * pageSize;
        result = result.skip(skip).limit(pageSize);
        
        const products = await result;
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching products',
            error: error.message
        });
    }
};


getAllProductsTesting = (req, res) => {
    res.status(200).json({
        message: 'List of all products for testing',
    });
};
module.exports = {
    getAllProducts,
    getAllProductsTesting
};
// This code defines a controller for handling product-related requests in a REST API.
// The `getAllProducts` function retrieves products based on query parameters like `featured`, `    
// company`, and `name`, allowing for filtering and sorting.
// The `getAllProductsTesting` function is a placeholder for testing purposes, returning a simple
// message.
// Both functions send JSON responses with appropriate status codes, and error handling is included
// to manage any issues that arise during the database queries.
// The `getAllProducts` function uses Mongoose to query the database, applying filters based on the
// provided query parameters.
// The `getAllProductsTesting` function is a simple endpoint for testing purposes, returning a
// static message.
// The code is structured to handle asynchronous operations using async/await, ensuring that the
// server responds only after the database operations are complete.
// The `getAllProducts` function is designed to handle various query parameters for filtering and
// sorting products, making it flexible for different client requests.
// The `getAllProductsTesting` function serves as a basic endpoint for testing the API, providing a
// simple response without any database interaction.
// The code is modular, allowing for easy integration into an Express.js application, and can be
// extended with additional functionality as needed.
