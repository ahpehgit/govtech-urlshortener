const express = require('express');

// address - /<host>:<port>/view
// load dependencies

const viewRouter = (dependencies) => {
    const router = express.Router();

    // load controller with dependencies
    router.get('/', (req, res) => {
        res.render('home', {page: 'URL Shortener', baseUrl: `${process.env.SERVER}:${process.env.PORT}`});
    });

    return router;
};

module.exports = viewRouter;