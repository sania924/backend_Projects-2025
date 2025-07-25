const joi=require('joi');
const listingSchema=joi.object({
    listing: joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    location: joi.string().required(),
    price: joi.number().min(0).required(),
    image: joi.string().allow(null, ''),

}).required()
});
module.exports=listingSchema;