const express = require('express');
const sample = require('./sample');
const urlConvert = require('./urlConvert');

const apiRouter = (dependencies) => {
    const routes = express.Router();

    const sampleRouter = sample(dependencies);
    const urlConvertRouter = urlConvert(dependencies);
    
    routes.use('/sample', sampleRouter);
    routes.use('/convert', urlConvertRouter);
    
    return routes;
};

module.exports = apiRouter;