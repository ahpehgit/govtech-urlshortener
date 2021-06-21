const axios = require('axios');
axios.defaults.adapter = require('axios/lib/adapters/http');

require('dotenv').config();

const FetchStatusCode = async(url) => {
    console.log('url', url);
    let res = '';
    await axios.get(url) 
    .then(response => {
        res = response.status;
    }).catch(err => {
        res = err.response.status;
    });
    return res;
}

const FetchResponseStatus = async(url) => {
    console.log('url', url);
    let res = '';
    await axios.get(url) 
    .then(response => {
        res = response.data.success;
    }).catch(err => {
        res = err.response.status;
    });
    return res;
}

it('Shorten with valid url', async() => {;
    expect(await FetchResponseStatus(`http://${process.env.SERVER}:${process.env.PORT}/convert/shorten/?url=https://google.com/`)).toEqual(true);
});

it('Shorten with invalid url', async() => {;
    expect(await FetchResponseStatus(`http://${process.env.SERVER}:${process.env.PORT}/convert/shorten/?url=https://google.com123123`)).toEqual(false);
});