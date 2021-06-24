const express = require('express');
const sample = require('./sample');
const urlConvert = require('./urlConvert');
const redirect = require('./redirect');
const view = require('./view');

const apiRouter = (dependencies) => {
    const routes = express.Router();

    const sampleRouter = sample(dependencies);
    const urlConvertRouter = urlConvert(dependencies);
    const redirectRouter = redirect(dependencies);
    const viewRouter = view();

    routes.use('/sample', sampleRouter);
    routes.use('/convert', urlConvertRouter);
    routes.use('/url', redirectRouter);
    routes.use('/', viewRouter);
    
    return routes;
};

module.exports = apiRouter;