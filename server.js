const express = require('express');
const bodyParser = require('body-parser'); //used for json parsing.
const mongoose = require('mongoose');

// create express app
const app = express();

// parse requests of content-type - applicaton/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));


/**
 *
 * Article - https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/
 */


/**************** DB config *******************/
const dbConfig = require('./config/database.config');

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
})
    .then(() => {
        console.log("Successfully connected to database");
    })
    .catch(err => {
        console.log('Could not connect to the database. Exiting now', err);
        process.exit();

    });

// parse requests of content-type - application/json
app.use(bodyParser.json());

require('./app/routes/place.route.js')(app);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});