const makeRequest = require('./helpers/apiHandler');
const { clearList, populateList } = require('./helpers/listActions')

describe('Check methods: POST, PUT, GET, DELETE', () => {
    test('GET positive case', async () => {
        await populateList(10, true);

        const result = await makeRequest();

        expect(result.status).toEqual(200);
        expect(result.data.length).toEqual(10);
        // TODO: check content if needed
    });

    test('PUT positive case', async () => {
        await clearList();

        const data = { value: 11, main_key: "111" };
        const result = await makeRequest('PUT', data);

        expect(result.status).toEqual(200);
        expect(result.data).toEqual(data);
    });

    test('PUT already existing value', async () => {
        await populateList(1, true);

        const data = { value: 12, main_key: "key0" };
        const result = await makeRequest('PUT', data);

        expect(result.status).toEqual(400);
    });

    // BUG: store quota === 11
    test('PUT store quota is <=10', async () => {
        await populateList(10, true);

        const data = { value: 11, main_key: "key_exceed" };
        const result = await makeRequest('PUT', data);

        expect(result.status).toEqual(400);
    });

    test('PUT already existing value', async () => {
        await populateList(1, true);

        const data = { value: 12, main_key: "key0" };
        const result = await makeRequest('PUT', data);

        expect(result.status).toEqual(400);
    });

    test('DELETE existing value', async () => {
        await populateList(1, true);

        const data = { value: 11, main_key: "key0" };
        const result = await makeRequest('DELETE', data);

        expect(result.status).toEqual(200);
        expect(result.data).toEqual(data);
    });
    test('DELETE non-existing value', async () => {
        const data = { value: 11, main_key: "key115" };
        const result = await makeRequest('DELETE', data);

        expect(result.status).toEqual(200);
    });
    test('POST positive case', async () => {
        await populateList(1, true);

        const data = { value: 11, main_key: "key0" };
        const result = await makeRequest('POST', data);

        expect(result.status).toEqual(200);
    });
    test('POST non-existing key', async () => {
        await clearList();

        const data = { value: 11, main_key: "key0" };
        const result = await makeRequest('POST', data);

        expect(result.status).toEqual(400);
    });
});

