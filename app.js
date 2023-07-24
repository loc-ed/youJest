require('dotenv').config();
const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const clients = require("./routes/clientRoutes");
const contacts = require("./routes/contactRoutes");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT;

mongoose.connect(process.env.CONN_URL)
  .then(()=> {
    console.log('You successfully connected to MongoDB!');
  })
  .catch((error)=> {
    console.log('Error connecting to MongoDB');
  });

app.get("/", (req, res) => {
  res.send(`<h1>BinaryCity DashBoard</h1>`)
});
app.listen(port, () => {
  console.log(`Application is listening at port ${port}`);
});
  
app.use("/api/v1/clients", clients);
app.use("/api/v1/contacts", contacts);

