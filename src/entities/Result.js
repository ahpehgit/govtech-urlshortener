module.exports = class Result {
    constructor(code, url, success, message) {
        this.code = code;
        this.url = url;
        this.success = success;
        this.message = message;
    }
};