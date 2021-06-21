//const RedisService = require('../infrastructure/database/RedisService');
const MongoService = require('../infrastructure/database/MongoService');

module.exports = (() => {
    return {
        DBService: new MongoService(),
    };
})();