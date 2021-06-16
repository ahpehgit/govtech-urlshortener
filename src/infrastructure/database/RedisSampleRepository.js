const SampleRepository = require('../../application/contracts/SampleRepository');


module.exports = class RedisSampleRepository extends SampleRepository {
    async add() {
        console.log('Calling from RedisSampleRepository');
    }
}