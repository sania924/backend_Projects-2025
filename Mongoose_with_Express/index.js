const express=require("express");
const app=express();
const mongoose =require("mongoose");
const Chat = require("./models/Chat.js"); 

const path=require("path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine","ejs")
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true})); // for parsing form data
// index route
app.get("/chats",async (req,res)=>{
let chats = await Chat.find();
console.log(chats);
res.render("index.ejs",{chats})    
})
// new Route
app.get("/chats/new", (req,res)=>{
    res.render("new.ejs")
})
// create route
app.post("/chats", (req,res)=>{
    let {from,to,msg} = req.body;
    let newchat = new Chat({
        from:from,
        to:to,
        msg:msg,
        created_at:new Date()
    });
         console.log(newchat);

     newchat.save().then(()=>{
        console.log("chat saved");
        res.redirect("/chats");
    });
})
app.get("/",(req,res)=>{
    res.send("root is working")
    console.log("root is working")
})
// build connection
async function main (){
    await mongoose.connect("mongodb://127.0.0.1/whattapp")
}
main().then(()=>{console.log("successful")})
// insertion method
// let chat1= new Chat({
//     from:"user1",
//     to:"user2",
//     msg:"hello",
//     created_at:new Date()
// });
// chat1.save().then(()=>{
//     console.log("chat saved")
// }).catch((err)=>{
//     console.log(err)
// })
// server start
app.listen(8080,()=>{
    console.log("server is listening")
})
