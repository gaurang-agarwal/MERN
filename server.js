import users from './routes/users';
import posts from './routes/posts';
import profile from './routes/profile';
import {DB_URL} from './config';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.get("/",(req,res) => res.send("hello world new") );

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

mongoose.connect(DB_URL).then(data =>console.log("Mongo DB Conected",data)).catch(err => console.log(err));

const port = process.env.PORT || 3000;


app.use("/api/posts", posts);
app.use("/api/profile", profile);
app.use("/api/users", users); 


app.listen(port,()=> console.log(`Server is running on port ${port}`));