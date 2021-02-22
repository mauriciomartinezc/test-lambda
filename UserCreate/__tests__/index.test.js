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
        name: user.name,
        email: user.email
    }
}

jest.mock('../validate', () => ({
    validate: jest.fn()
        .mockImplementationOnce(() => null)
        .mockImplementationOnce(() => ({
            email: "El correo electrónico ya está en uso"
        }))
}));

jest.mock('../helpers/User/setDataCreateUser', () => ({
    setDataCreateUser: jest.fn()
        .mockImplementationOnce(() => Promise.resolve(user))
        .mockImplementationOnce(() => Promise.reject("Error testing"))
}));

describe('Testing user create', () => {
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