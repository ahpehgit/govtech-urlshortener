const express = require('express');
const RedirectController = require('../controllers/RedirectController');

// address - /<host>:<port>/<code>
// load dependencies

const redirectRouter = (dependencies) => {
    const router = express.Router();

    // load controller with dependencies
    const controller = RedirectController(dependencies);
    router.get('/:code', controller.redirect);
    return router;
};

module.exports = redirectRouter;