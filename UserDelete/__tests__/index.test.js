const {handler} = require('../index');

const user = {
    id: 1,
    name: "Testing",
    email: "testing@testing.co",
    created_at: "2021-01-01 00:00:00",
    updated: "2021-01-01 00:00:00"
};

const event = {
    id: 1
}

jest.mock('../validate', () => ({
    validate: jest.fn()
        .mockImplementationOnce(() => null)
        .mockImplementationOnce(() => ({
            id: "El recurso solicitado no existe"
        }))
}));

jest.mock('../helpers/User/destroyUser', () => ({
    destroyUser: jest.fn()
        .mockImplementationOnce(() => Promise.resolve(user))
        .mockImplementationOnce(() => Promise.reject("Error testing"))
}));

describe('Testing user delete', () => {
    test('Testing success', async () => {
        const {statusCode} = await handler(event);
        expect(statusCode).toBe(200);
    });
    test('Testing fail validate', async () => {
        const {statusCode} = await handler(event);
        expect(statusCode).toBe(422);
    });
    test('Testing fail database', async () => {
        const {statusCode} = await handler(event);
        expect(statusCode).toBe(500);
    });
});