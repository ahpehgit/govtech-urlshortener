const mongoose = require('mongoose');
const DBService = require('../../application/contracts/DBService');

module.exports = class MongoService extends DBService {
    constructor() {
        super();
    }

    async initDatabase() {
        const dbName = "urlshortener_db";
        //const url = `mongodb://${process.env.MONGO_HOSTNAME}:27017/${dbName}`; //mongoserver is service name of mongo in dockers
        const url = `mongodb://192.168.1.103:27017/${dbName}`; //mongoserver is service name of mongo in dockers

        return setTimeout(() => {
            return mongoose.connect(url, { useNewUrlParser: true })
                .then(() => {
                console.log("Mongo Database created!");
            })
            .catch(error => {
                throw error;
            });
        }, 5000); //delay 10 seconds to let mongo server to get ready
    }
};