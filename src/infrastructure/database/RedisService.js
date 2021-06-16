const DBService = require('../../application/contracts/DBService');

const RedisSampleRepository = require('./RedisSampleRepository');

module.exports = class RedisService extends DBService {
    constructor() {
        super();
        this.sampleRepository = new RedisSampleRepository();
    }

    async initDatabase() {
        //const dbName = "spaceout_db";
        //const url = `mongodb://${process.env.MONGO_HOSTNAME}:27017/${dbName}`; //mongoserver is service name of mongo in dockers

        console.log('Redis DB connected!');
    }
};