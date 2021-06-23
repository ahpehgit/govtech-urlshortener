const express = require('express');

// address - /<host>:<port>/view
// load dependencies

const viewRouter = (dependencies) => {
    const router = express.Router();

    // load controller with dependencies
    router.get('/home', (req, res) => {
        res.render('home', {page: 'URL Shortener'});
    });

    router.get('/sample', (req, res) => {
        res.render('sample', {page: 'Home', menuId: 'home'});
    });
    return router;
};

module.exports = viewRouter;