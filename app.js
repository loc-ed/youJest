require('dotenv').config();
const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
var session = require('express-session')

const clients = require("./routes/clientRoutes");
const contacts = require("./routes/contactRoutes");

const app = express();

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret:"its a secret",
  resave: false,
})
);

app.use((req,res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
})

  
//set template engine
app.set('view engine', 'ejs');


const port = process.env.PORT;

mongoose.connect(process.env.CONN_URL)
  .then(()=> {
    console.log('You successfully connected to MongoDB!');
  })
  .catch((error)=> {
    console.log(`Error connecting to MongoDB : ${error}`);
  });

app.listen(port, () => {
  console.log(`Application is listening at port ${port}`);
});
  
app.use("/", clients);
// app.use("/contacts", contacts);
app.use("/contacts", contacts);



