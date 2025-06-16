const mongoose =require("mongoose");
const Chat = require("./models/Chat.js"); 


async function main (){
    await mongoose.connect("mongodb://127.0.0.1/whattapp")
}
main().then(()=>{console.log("successful")})
 const AllChat = [
    {
      from: "user1",
      to: "user2",
      msg: "Hello!",
      created_at: new Date()
    },
    {
      from: "user2",
      to: "user1",
      msg: "Hi there!",
      created_at: new Date()
    },
    {
      from: "user3",
      to: "user4",
      msg: "What's up?",
      created_at: new Date()
    },
    {
      from: "user4",
      to: "user3",
      msg: "All good here!",
      created_at: new Date()
    },
    {
      from: "user5",
      to: "user6",
      msg: "Are you coming to the meeting?",
      created_at: new Date()
    },
    {
      from: "user6",
      to: "user5",
      msg: "Yes, I’ll be there.",
      created_at: new Date()
    },
    {
      from: "user7",
      to: "user8",
      msg: "Let's catch up later.",
      created_at: new Date()
    },
    {
      from: "user8",
      to: "user7",
      msg: "Sure thing!",
      created_at: new Date()
    },
    {
      from: "user9",
      to: "user10",
      msg: "Did you check the report?",
      created_at: new Date()
    },
    {
      from: "user10",
      to: "user9",
      msg: "Yes, looks great!",
      created_at: new Date()
    }
  ];

   Chat.insertMany(AllChat);