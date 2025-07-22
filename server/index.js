const express = require("express");
const mongoose = require("mongoose");
// const compression = require('compression'); //for increasing loading speed
const enquiryRouter = require("./App/routes/web/enquiryRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();

// app.use(compression()); //for increasing loading speed

app.use(cors()); //middleware for cors error
app.use(express.json());

//Routes
app.use('/api/website/enquiry', enquiryRouter);


//connect to MongoDB
mongoose.connect(process.env.DBURL)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(process.env.PORT, () => {
            console.log("Server is Running");
        })
    })
    .catch((err) => {
        console.log("Error", err);
    })