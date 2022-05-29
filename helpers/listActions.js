const makeRequest = require("./apiHandler");

const clearList = async () => {
    /***
     * Clears all values stored at endpoint
     ***/
    const list = await makeRequest();
    return Promise.all(list.data.map(async(item) => {
        await makeRequest('DELETE', item);
    }));
};
const populateList = async(count = 10, clear = false) => {
    /***
     * Creates new values (key/value) at store at endpoint.
     ***/
    if (clear) {
        await clearList();
    }
    const data = [...new Array(count).keys()].map(item => {
        return { value: 11, main_key: `key${item}`};
    })
    return Promise.all(data.map(async(item) => {
        await makeRequest('PUT', item);
    }));
}

module.exports = { clearList, populateList };
