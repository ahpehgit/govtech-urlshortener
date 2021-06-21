const crypto = require('crypto');
const axios = require('axios');
const Response = require('../../entities/Response');
const Utility = require('./Utility');

module.exports = (UrlRepository) => {

    const Execute = async (longUrl) => {
        //* Query long url to see if it is a valid url
        //* Check long url to see if it exists in db
        //* Generate new shorten url if not exist or return the shorten url found in db

        const sanitizeUrl = SanitizeUrlInput(longUrl);

        let isUrlValid = false;
        let status = await TestUrl(sanitizeUrl);
        let response = null;
        
        if (status != 200) {
            const httpUrl = 'http://'.concat(sanitizeUrl.substring(8));
            status = await TestUrl(httpUrl);

            if (status === 200) {
                isUrlValid = true;
            }
        } else {
            isUrlValid = true;
        }

        if (isUrlValid) {
            const urlObj = await UrlRepository.getByUrl(sanitizeUrl);

            let token = '';
            if (urlObj && urlObj.success) {
                token = urlObj.code;
                const shortUrl = `https://localhost:3000/${token}`;
                response = new Response(shortUrl, true, 'Url already exists, return existing short url');
            }
            else {
                const allCodes = await UrlRepository.getAllCodes();
                token = crypto.randomBytes(8).toString('hex');

                while (allCodes.includes(token)) {
                    token = crypto.randomBytes(8).toString('hex');
                }

                const addResult = await UrlRepository.add(token, sanitizeUrl);
                if (addResult.success) {
                    const shortUrl = `https://localhost:3000/${token}`;
                    response = new Response(shortUrl, true, 'Short url is generated');
                } else {
                    response = new Response(null, false, addResult.message);
                }
            }

        } else {
            return new Response(null, false, 'Url string is not valid or cannot be reached');
        }
 
        return response;
    }

    const TestUrl = async (url) => {        
        return await axios.get(url)
        .then(response => {
            return response.status;
        }).catch(err => {
            return -1;
        });
    }

    const SanitizeUrlInput = (input) => {
        input = Utility.StripSlash(input);

        if (input.slice(0, 8) === 'https://' || input.slice(0, 7) === 'http://') {
            return input
        }
        
        return 'https://'.concat(input);
    }

    return {
        Execute
    };
}