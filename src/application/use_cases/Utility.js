const StripSlash = (input) => {
    if (input.slice(-1) !== '/') {
        return input;
    }

    return StripSlash(input.slice(0, -1));
}

module.exports = {
    StripSlash,
}