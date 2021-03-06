const Shorten = require('../application/use_cases/Shorten');
const Lengthen = require('../application/use_cases/Lengthen');

module.exports = (dependencies) => {

    const { urlRepository } = dependencies.DBService;
    
    const shorten = (req, res, next) => {
        //localhost:3000/convert/shorten

        const query = Shorten(urlRepository);
        query.Execute(req.query.url).then((data) => {
            if (data) {
                res.json(data);
            }
            else {
                res.sendStatus(401);
            }
        }, (err) => {
            next(err);
        });
    };

    const lengthen = (req, res, next) => {
        //localhost:3000/convert/lengthen

        const query = Lengthen(urlRepository);
        query.Execute(req.query.url).then((data) => {
            if (data) {
                res.json(data);
            }
            else {
                res.sendStatus(401);
            }
        }, (err) => {
            next(err);
        });
    };

    return {
        shorten,
        lengthen
    };
}