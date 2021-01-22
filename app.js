
//Express Server config
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const morgan = require('morgan');
const bodyparser = require('body-parser');

const port = 2021;
app.listen(port, () => {
    console.log("NodeJs Application is up! and running on port :" + port);
});
//app.use(express.json());


//logging
app.use(morgan('dev'));
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json());


//CORS Error Handling
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin,X-Requested-with,Content-Type,Accept,Authorization');
    if (request.method === "OPTIONS") {
        response.header('Access-Control-Allow-Methods', 'PUT,PATCH,DELETE,GET,POST');
        return response.status(200).json({});
    }
    next();
});

//MongoDB config
const url = "mongodb://localhost:27017/testdb";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const con = mongoose.connection
con.on('open', () => { console.log("DB is Connected!") })


//RouterConfigs
const productRouter = require("./routes/product.router");
app.use('/products', productRouter);

const userRouter = require("./routes/UserRouter");
app.use('/user', userRouter);

//Error Handling
app.use((request, response) => {
    response.json({ "statusCode": 404, "message": "Not Found" })
});

app.use((error, request, response, next) => {
    response.json({ "statusCode": error.status || 500, "message": error.message })
});

module.exports = app;
