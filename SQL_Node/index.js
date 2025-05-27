const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express=require('express');

const app=express();
const path=require("path");
const methodoverride=require("method-override");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(methodoverride("_method"));
app.use(express.urlencoded({extended:true}));
// faker callback function
// let createRandomUser=()=> {
//   return {
//     userId: faker.string.uuid(),
//     username: faker.internet.username(), // before version 9.1.0, use userName()
//     email: faker.internet.email(),
//     password: faker.internet.password(),
//   };
// }
// console.log(createRandomUser());

// for build connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'office',
  password: '924@sania'
});
// let createRandomUser30=()=> {
//   return [
//     faker.string.uuid(),
//      faker.internet.username(), 
//   faker.internet.email(),
//  faker.internet.password(),
//   ];
// }
// use database in node 

// // A simple SELECT query manually add data 
// let q= 'SHOW TABLES'
// // for insert values use placeholder
// let p = 'INSERT INTO CS(id, name, email, password) VALUES ?';
// // fro placeholder replace values
// let users=[
// ["127","saniaf","@gmailc.comf","123f"],["126","saniac","@gmaild.com","123c"]
// ];
// //add 30 data in data base
// let s = 'INSERT INTO cs3(id, name, email, password) VALUES ?';
// let data=[];
// for(i=1;i<=30;i++){
//   // console;log(createRandomUser30())
// data.push(createRandomUser30());
// console.log(createRandomUser30())
// }
// connection.query(
//  s,[data], (err, results, fields)=> {
//     console.log(results); // results contains rows returned by server
//     console.log(fields); // fields contains extra meta data about results, if available
    
//   }
// );
app.get("/", (req, res) => {
  let r = `SELECT COUNT(*) AS total FROM cs3`;

  connection.query(r, (err, result) => {
    if (err) {
      console.error("DB error:", err);
      return res.send("some error occurred");
    }

    console.log("Result from DB:", result); 
    let count = result[0].total;
    res.render("home", { count });
  });
});

// show/user route
app.get("/user", (req, res) => {
  let r = `SELECT * FROM cs3`;

  connection.query(r, (err, users) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).send("Database error");
    }

    // console.log(result);
res.render("showusers.ejs",{users}) 
 });
});
// for edit route
app.get("/user/:id/edit",(req,res)=>{
let {id}=req.params;
let qy= `Select * from cs3 where id='${id}'`;
connection.query(qy,(err,result)=>{
  let user= result[0]
  console.log(result[0])
res.render("edit.ejs",{user})

})
})
// update db route
app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let { password: formpass, name: newname } = req.body;

  let q = `SELECT * FROM cs3 WHERE id='${id}'`;

  connection.query(q, (err, result) => {
    if (err) {
      return res.status(500).send("Database error");
    }

    let user = result[0];
    if (formpass !== user.password) {
      res.send("Wrong password");
    } else {
      let q2 = `UPDATE cs3 SET name='${newname}' WHERE id='${id}'`;

      connection.query(q2, (err, result) => {
        if (err) {
          return res.status(500).send("Update failed");
        }

        res.redirect("/user");
      });
    }
  });
});


app.listen(8080, () => {
  console.log("server is listening on port 8080");
});