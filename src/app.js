const express = require('express');
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const bodyParser = require("body-parser");
const mongoose = require('mongoose')

// mongoose.connect('mongodb://127.0.0.1:27017/sieve', {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false
// })



const app = express();
mongoose
  .connect(
    "mongodb+srv://ron:ahRQPHtAwJMQiwkW@cluster0-ov77s.mongodb.net/test?retryWrites=true&w=majority")
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });


const port = process.env.PORT || 3000

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });

app.listen(port, () => {
    console.log("Server is listening on port 3000");
})

app.use(userRoutes)
app.use(postRoutes)

module.exports = app;
