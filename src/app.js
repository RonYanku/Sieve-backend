const express = require('express');
const userRoutes = require("./routes/user");
const bodyParser = require("body-parser");
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/sieve', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})



const app = express();

const port = process.env.PORT || 3000

app.use(bodyParser.json());
app.use(userRoutes)

app.listen(port, () => {
    console.log("Server is listening on port 3000");
})

module.exports = app;
