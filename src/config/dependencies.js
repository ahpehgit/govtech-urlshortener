const RedisService = require('../infrastructure/database/RedisService');

module.exports = (() => {
    return {
        DBService: new RedisService(),
    };
})();