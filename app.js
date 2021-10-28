const express = require('express');
const ExpressError = require('./expressError');
const itemsRoutes = require('./routes/items');
const morgan = require('morgan');

const app = express();

// use external logger before each request-responce circle
app.use(morgan('dev'));

// parse each request body-data into json
app.use(express.json());

//  apply a prefix to every route in routes
app.use("/items", itemsRoutes); 

// If no other route matches, respond with a 404
app.use((req, res, next) => {
    const e = new ExpressError("Page Not Found", 404);
    next(e)
});
  
// Error handler
app.use(function (err, req, res, next) { 
    // the default status is 500 Internal Server Error
    let status = err.status || 500;
    let message = err.msg;
    // set the status and alert the user with a provided message
    return res.status(status).json({
        error: { message, status }
        });
});


module.exports = app;


