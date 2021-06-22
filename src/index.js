const express = require('express');
const cors = require('express');
const routes = require('./routes');
const dependencies = require('./config/dependencies');
const cronjob = require('./cronjob');

const app = express();
const port = process.env.PORT || 3000;

dependencies.DBService.initDatabase().then(() => {

    // * Application-Level Middleware * //

    // Third-Party Middleware
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Built-In Middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // View engine setup
    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views'); //service views for static pages
    app.use('/public', express.static(__dirname + '/public')); //serve public static files

    // load routes
    app.use('/', routes(dependencies));

    // * Cron * //
    //cronjob.start(dependencies, '*/10 * * * * *');

    // * Start * //
    app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`),
    );
}, (err) => {
    console.log(`DB not ready, err:${err}`);
    process.exit(1);
});