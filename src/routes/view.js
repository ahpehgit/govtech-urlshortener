const express = require('express');

// address - /<host>:<port>/view
// load dependencies

const viewRouter = (dependencies) => {
    const router = express.Router();

    // load controller with dependencies
    router.get('/', (req, res) => {
        res.render('home', {page: 'URL Shortener', menuId: 'home'});
    });

    router.get('/sampleView', (req, res) => {
        res.render('sample', {page: 'Home', menuId: 'home'});
    });
    return router;
};

module.exports = viewRouter;