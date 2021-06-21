const mongoose = require('mongoose');
const UrlRepository = require('../../application/contracts/UrlRepository');
const Result = require('../../entities/Result');

const UrlSchema = new mongoose.Schema({
    code: String,
    url: String,
    createdAt: Date,
});

const Model = mongoose.model('Url', UrlSchema);

module.exports = class MongoUrlRepository extends UrlRepository {
    async add(code, url) {
        const date = new Date();
        const Url = new Model({code, url, date});

        await Url.save()
        .then(() => {
            console.log(`Url ${url} with code: ${code} inserted`); 
        })
        .catch(err => {
            throw err;
        });

        return new Result(code, url, true, `Url ${url} with code: ${code} inserted`);
    }

    async getAllCodes() {
        const data = await Model.find({},  {_id: 0, code: 1});
        if (data) 
            return data.map(d => d.code);
        
        return [];
    }

    async getByCode(code) {
        const filter = {
            'code': { $eq: code }
        };
        const data = await Model.findOne(filter);

        if (data) {
            return new Result(data.code, data.url, true, `Url ${data.url} with code: ${data.code} found`);
        }
        else {
            return new Result(null, null, false, `Code not found`); 
        }
    }

    async getByUrl(url) {
        const filter = {
            'url': { $eq: url }
        };
        const data = await Model.findOne(filter);

        if (data) {
            return new Result(data.code, data.url, true, `Url ${data.url} with code: ${data.code} found`);
        }
        else {
            return new Result(null, null, false, `Url not found`); 
        }
    }

    async deleteAll() {
        return await Model.deleteMany({})
            .then(() => {
                console.log('Urls all deleted');
            })
            .catch(err => {
                throw err;
            });
    }
}