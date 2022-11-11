const connection = require("./myConnection");
const express = require("express");
const routes = require("./routes/index");
const imgModel = require('./Models/imageModel');

const app = express();
const cors = require("cors");
const fs = require('fs');
const path = require('path');
const bodyParser = require("body-parser");
const mongoose = require('mongoose')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
  
// Set EJS as templating engine 
app.set("view engine", "ejs");

const PORT = 5000;

// app.use(bodyParser.json()).use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );
app.use(express.static(path.join(__dirname, '/public')))
app.use(express.static(path.join(__dirname, '/images')))
// app.use("/uploads",express.static('uploads'))
// app.use(express.static(__dirname + '/public'));
// app.use('/uploads', express.static('uploads'));
app.use(cors());
app.use(express.json());
// app.use(routes);
app.use('/api/admin', routes)

app.listen(PORT, () => console.log(`Server Connected to port ${PORT}`));
