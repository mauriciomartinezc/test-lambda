const {handler} = require('../index');

const user = {
    id: 1,
    name: "Testing",
    email: "testing@testing.co",
    created_at: "2021-01-01 00:00:00",
    updated: "2021-01-01 00:00:00"
};

const event = {
    body: {
        id: 1
    }
}

jest.mock('../validate', () => ({
    validate: jest.fn()
        .mockImplementationOnce(() => null)
        .mockImplementationOnce(() => ({
            id: "El recurso solicitado no existe"
        }))
}));

jest.mock('../models/User', () => () => {
    const SequelizeMock = require("sequelize-mock");
    const dbMock = new SequelizeMock();
    return dbMock.define('user', user);
});

describe('Testing user show', () => {
    test('Testing success', async () => {
        const {statusCode} = await handler(event);
        expect(statusCode).toBe(500);
    });
    test('Testing fail validate', async () => {
        const {statusCode} = await handler(event);
        expect(statusCode).toBe(422);
    });
});