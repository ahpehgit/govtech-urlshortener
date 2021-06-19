const express = require('express');
const UrlConvertController = require('../controllers/UrlConvertController');

// address - /<host>:<port>/convert
// load dependencies

const sampleRouter = (dependencies) => {
    const router = express.Router();

    // load controller with dependencies
    const controller = UrlConvertController(dependencies);
    router.get('/shorten', controller.shorten);
    router.get('/lengthen', controller.lengthen);
    return router;
};

module.exports = sampleRouter;