const Redirect = require('../application/use_cases/Redirect');

module.exports = (dependencies) => {

    const { urlRepository } = dependencies.DBService;
    
    const redirect = (req, res, next) => {
        //localhost:3000/url/<code>

        const code = req.params.code;
        const query = Redirect(urlRepository);

        query.Execute(code).then((data) => {
            if (data) {
                if (data.success) {
                    res.redirect(data.data);
                }
                else {
                    res.status(404).json('Url not found');
                } 
            }
            else {
                res.sendStatus(400);
            }
        }, (err) => {
            res.status(404).json('Url not found');
            next(err);
        });
    };

    return {
        redirect
    };
}