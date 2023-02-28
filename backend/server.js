const express = require("express");
var cors = require('cors')

const app = express();

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

app.listen(4000, () =>
  console.log('Example app listening on port 4000!'),
);