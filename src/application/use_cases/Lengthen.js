const Response = require('../../entities/Response');
const Utility = require('./Utility');

module.exports = (UrlRepository) => {

    const Execute = async (shortUrl) => {
        shortUrl = Utility.StripSlash(shortUrl);
        const code = shortUrl.slice(-8);
        let response = null;
        const getByCodeResult = await UrlRepository.getByCode(code);

        if (getByCodeResult.success) {
            response = new Response(getByCodeResult.url, true, 'Long url found');
        }
        else {
            response = new Response(null, false, 'Short url is not valid');
        }
        return response;
    }

    return {
        Execute
    };
}