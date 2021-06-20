
module.exports = () => {

    const Execute = async (code) => {
        console.log('code', code);

        //* Check if code exists, if exists return long url, else return err

        return 'https://google.com/';
        //throw new Error('Code not found');
    }

    return {
        Execute
    };
}