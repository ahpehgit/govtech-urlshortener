const mongoose = require('mongoose');
const DBService = require('../../application/contracts/DBService');
const MongoUrlRepository = require('./MongoUrlRepository');

module.exports = class MongoService extends DBService {
    constructor() {
        super();
        this.urlRepository = new MongoUrlRepository();
    }

    async initDatabase() {
        const dbName = "urlshortener_db";
        //const url = `mongodb://${process.env.MONGO_HOSTNAME}:27017/${dbName}`; //mongoserver is service name of mongo in dockers
        //const url = `mongodb://192.168.1.103:27017/${dbName}`; //mongoserver is service name of mongo in dockers
        const url = `mongodb+srv://user:pb6dbaV24MvFLWiy@cluster0.r6oje.mongodb.net/${dbName}?retryWrites=true&w=majority`;
        
        return setTimeout(() => {
            return mongoose.connect(url, { useNewUrlParser: true })
                .then(async () => {
                console.log("Mongo Database created!");

                await this.urlRepository.deleteAll();
            })
            .catch(error => {
                throw error;
            });
        }, 3000); //delay 10 seconds to let mongo server to get ready
        //console.log("Mongo Database created!");
    }
};