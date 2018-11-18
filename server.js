const express = require('express');
const app = express();
const mongoose = require('mongoose');

const DB_URL="mongodb://root:root123@ds033170.mlab.com:33170/learningmern"
app.get("/",(req,res) => res.send("hello world new") );

mongoose.connect(DB_URL).then(data =>console.log("Mongo DB Conected",data)).catch(err => console.log(err));

const port = process.env.PORT || 3000;


app.listen(port,()=> console.log(`Server is running on port ${port}`));