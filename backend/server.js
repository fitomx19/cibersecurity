const express = require("express");

const app = express();

require("./db");

app.use(express.urlencoded({ extended: true })); //solo quiero sus datos
app.use(express.json());

var indexRouter = require("./routes/rutas");

app.use("/", indexRouter);

app.listen(3000, () =>
  console.log('Example app listening on port 3000!'),
);