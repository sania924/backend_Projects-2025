const mongoose = require('mongoose');

main().then(()=>{console.log("connction successful")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');

}
// Schema
const userSchema=new mongoose.Schema({
name:String,
Age:Number,
Email:String
})
// model
const Employee=mongoose.model("Employee",userSchema)
// insert 1 document 
const Employee1=new Employee({
  name:"sania",
  Age:30,
  
  Email:"@gmail.com"
})
Employee1.save();