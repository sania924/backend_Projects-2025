getAllProducts = (req, res) => {
res.status(200).json({
    message: 'List of all products',
});
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