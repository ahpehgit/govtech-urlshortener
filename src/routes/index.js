const express = require('express');
const sample = require('./sample');
const urlConvert = require('./urlConvert');
const redirect = require('./redirect');

const apiRouter = (dependencies) => {
    const routes = express.Router();

    const sampleRouter = sample(dependencies);
    const urlConvertRouter = urlConvert(dependencies);
    const redirectRouter = redirect(dependencies);
    
    routes.use('/sample', sampleRouter);
    routes.use('/convert', urlConvertRouter);
    routes.use('/', redirectRouter)
    
    return routes;
};

module.exports = apiRouter;