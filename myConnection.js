// const connectDB = require("./db");
require("dotenv").config()
const mongoose = require("mongoose");


// mongodb://172.105.55.116:27017/cv-builder

// const url = `mongodb://172.105.55.116:27017/cv-builder`

const url = `mongodb://127.0.0.1:27017/cv-builder`

const connection = mongoose.connect(url,{
   useNewUrlParser: true,
   useUnifiedTopology: true
});

// connection.on()
const conn = mongoose.connection

conn.once('open', () =>{
    console.log('connected....')
})
//Connecting the Database
 module.export = connection