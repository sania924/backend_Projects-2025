const mongoose = require('mongoose');
const { Schema } = mongoose;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/relationshipDB')
  .then(() => {
    console.log(' Database connection successful');
    run(); // Run main logic after connection
  })
  .catch((error) => {
    console.error(' Database connection error:', error);
  });

// Order Schema
const orderSchema = new Schema({
  item: String,
  price: Number,
});



// Customer Schema
const customerSchema = new Schema({
  name: String,
  orders: [
    { type: Schema.Types.ObjectId, ref: 'Order' }
  ],
});

// use post mongoose middleware to delete orders when customer is deleted
customerSchema.post('remove', async function (doc) {
  const Order = mongoose.model('Order', orderSchema);
  await Order.deleteMany({ _id: { $in: doc.orders } });
});

const Order = mongoose.model('Order', orderSchema);
const Customer = mongoose.model('Customer', customerSchema);

// Add customer and orders
const addCustomer = async () => {
  const order1 = new Order({ item: 'memory', price: 1500 });
  const order2 = new Order({ item: 'RAM', price: 1600 });

  await order1.save();
  await order2.save();

  const newCustomer = new Customer({
    name: 'Sana',
    orders: [order1._id, order2._id],
  });

  await newCustomer.save();
  console.log(' Customer and orders saved');
};

// Fetch customer with populated order details
const getCustomerWithOrders = async () => {
  const customer = await Customer.findOne({ name: 'Sana' }).populate('orders');
  console.log(' Customer with orders:', JSON.stringify(customer, null, 2));
};

// Main function to run both
const run = async () => {
  await addCustomer();
  await getCustomerWithOrders();
  mongoose.connection.close(); // Close connection after operations
};

// delete the sana order
