module.exports =(fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(err => {
            console.error('Error in catchAsync:', err);
            next(err); // Pass the error to the next middleware
        });
    };
}