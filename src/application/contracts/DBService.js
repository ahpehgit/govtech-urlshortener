/* eslint-disable class-methods-use-this */
module.exports = class DBService {

    constructor() {
        this.sampleRepository = null;
        this.urlRepository = null;
    }

    initDatabase() {
        return Promise.reject(new Error('Method not implemented'));
    }
};