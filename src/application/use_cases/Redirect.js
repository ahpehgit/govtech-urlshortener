const Response = require('../../entities/Response');

module.exports = (UrlRepository) => {

    const Execute = async (code) => {

        //* Check if code exists, if exists return long url, else return err
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