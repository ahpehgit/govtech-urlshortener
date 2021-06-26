const express = require('express');
const cors = require('express');
const routes = require('./routes');
const dependencies = require('./config/dependencies');

const app = express();
const port = process.env.PORT || 3001;
const host = process.env.SERVER || 'No host name specified';

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

    // * Start * //
    app.listen(port, () => {
        console.log(`App host name is ${host}!`),
        console.log(`App listening on port ${port}!`);
    });
}, (err) => {
    console.log(`DB not ready, err:${err}`);
    process.exit(1);
});