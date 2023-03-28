const express = require("express");
var cors = require('cors')
const https = require('https')
const fs = require('fs')

const app = express();
const httpsOptions = {
  key: fs.readFileSync('./cert.key'),
  cert: fs.readFileSync('./cert.pem')
  }
require("./db");

//permitir cors
app.use(cors());
app.use(express.json()); //this is the build in express body-parser 
app.use(                //this mean we don't need to use body-parser anymore
  express.urlencoded({
    extended: true,
  })
); 



var indexRouter = require("./routes/rutas");
app.use("/", indexRouter);

const PORT = 4000;
const port = process.env.PORT||PORT;
https.createServer(httpsOptions, app).listen(port)
console.log(`Running on ${PORT}`);