const axios = require('axios');
axios.defaults.adapter = require('axios/lib/adapters/http');

require('dotenv').config();

const FetchStatusCode = async(url) => {
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
    let res = '';
    await axios.get(url) 
    .then(response => {
        res = response.data.success;
    }).catch(err => {
        res = err.response.status;
    });
    return res;
}

it('Shorten with valid url', async() => {
    expect(await FetchResponseStatus(`http://${process.env.SERVER}:${process.env.PORT}/convert/shorten/?url=https://google.com/`)).toEqual(true);
});

it('Shorten with invalid url', async() => {
    expect(await FetchResponseStatus(`http://${process.env.SERVER}:${process.env.PORT}/convert/shorten/?url=https://google.com123123`)).toEqual(false);
});

it('Lengthen with valid short url', async() => {
    await axios.get(`http://${process.env.SERVER}:${process.env.PORT}/convert/shorten/?url=https://google.com/`) 
    .then(response => response.data.data)
    .then (async(shortUrl) => {
        await expect(await FetchResponseStatus(`http://${process.env.SERVER}:${process.env.PORT}/convert/lengthen/?url=${shortUrl}`)).toEqual(true);
    });
});

it('Lengthen with invalid short url', async() => {
    expect(await FetchResponseStatus(`http://${process.env.SERVER}:${process.env.PORT}/convert/lengthen/?url=http://${process.env.SERVER}:${process.env.PORT}/url/123123123`)).toEqual(false);
});

it('Shorten url with valid redirect', async() => {
    await axios.get(`http://${process.env.SERVER}:${process.env.PORT}/convert/shorten/?url=https://google.com/`) 
    .then(response => response.data.data)
    .then(async(shortUrl) => {
        await expect(await FetchStatusCode(shortUrl)).toEqual(200);
    });
});

it('Shorten url with invalid redirect', async() => {;
    expect(await FetchStatusCode(`http://${process.env.SERVER}:${process.env.PORT}/url/123456`)).toEqual(404);
});