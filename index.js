const connection = require("./myConnection");
const express = require("express");
const routes = require("./routes/index");
const app = express();
const cors = require("cors");
const path = require('path');
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
  
// Set EJS as templating engine 
app.set("view engine", "ejs");

const PORT = 5000;


app.use(express.static(path.join(__dirname, '/public')))
app.use(express.static(path.join(__dirname, '/images')))
app.use(express.static(path.join(__dirname, '/assets')))

app.use(cors());
app.use(express.json());

app.use('/api/admin', routes)

app.listen(PORT, () => console.log(`Server Connected to port ${PORT}`));
