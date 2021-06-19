const crypto = require('crypto');
const axios = require('axios');

module.exports = () => {

    const Execute = async (longUrl) => {
        //* Query long url to see if it is a valid url
        //* Check long url to see if it exists in db
        //* Generate new shorten url if not exist or return the shorten url found in db

        let token = '';
        //console.log('longUrl', longUrl);

        const sanitizeUrl = SanitizeUrlInput(longUrl);
        //console.log('SanitizeUrl', sanitizeUrl)
        
        let isUrlValid = false;
        let status = await TestUrl(sanitizeUrl);
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
            token = crypto.randomBytes(8).toString('hex');   
        } else {
            token = 'Url string is not valid or cannot be reached';
        }

        return token;
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
        if (input.slice(0, 8) === 'https://' || input.slice(0, 7) === 'http://') {
            return input
        }
        
        return 'https://'.concat(input);
    }

    return {
        Execute
    };
}