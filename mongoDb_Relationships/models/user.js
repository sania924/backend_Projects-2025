const mongoose= require('mongoose');
const {Schema} = mongoose;
// connection with database

mongoose.connect('mongodb://127.0.0.1:27017/relationshipDB')
.then(() => {
  console.log('Database connection successful');
})
.catch((error) => {
  console.error('Database connection error:', error);
});

// one to few relationship schema
const userSchema = new Schema({
  userName: String,

  Address: [
    {     _id:false,
         location: String,
      city: String,
        
    }

  ]
});
const User = mongoose.model('User', userSchema);
const addUser = async () => {
const newUser = new User({
  userName: 'John Doe',
  Address: [
    { location: '123 Main St', city: 'Anytown' },
    { location: '456 Elm St', city: 'Othertown' }
  ]
});
await newUser.save();
console.log('User added:', newUser);
};
addUser();

