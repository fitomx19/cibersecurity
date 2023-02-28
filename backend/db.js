const mongoose = require("mongoose");

//variables de entorno
require('dotenv').config({ path: "variables.env" });


mongoose
  .connect(process.env.DB_URL, {
   
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("DB funcionando bien "  ))
  .catch((err) => console.log(err));