const axios = require('axios').default;

const makeRequest = (method, data) => {
    const options = {
        url: 'https://l761dniu80.execute-api.us-east-2.amazonaws.com/default/exercise_api',
        method: method,
        data: JSON.stringify(data),
        validateStatus: null,
    };
    return axios(options)
    .then(response => {
        // TODO: add logging if needed
        // console.log(response);
        return response;
    })
    .catch(error => {
        console.log(error.response);
    });
};

module.exports = makeRequest;