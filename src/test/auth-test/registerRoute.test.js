const supertest = require('supertest');
const UserModel = require('../../Model/UserModel');
const { connect } = require('../dataBase/database');
const app = require('../../index');

const api = supertest(app);

describe('sign up and login a user', () => {
    let conn;

    beforeAll(async () => {
        conn = await connect();
    });

    afterEach(async () => {
        await conn.cleanup();
    });

    afterAll(async () => {
        await conn.disconnect();
    });

    it('should create a new user ', async () => {
        const newUser = {
            email: 'victor@gmail.com',
            password: '1234567',
            firstname: 'Victor',
            lastname: 'Barny',
            username: 'Vicky',
            confirmPassword: '1234567',
        };
        const response = await api.post('/api/v1/auth/register').send(newUser);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
    }, 120000);

    it('should log a user in ', async () => {
        const loginDetails = {
            email: 'victor@gmail.com',
            Password: '1234567',
        };
        const response = await api
            .post('/api/v1/auth/login')
            .send(loginDetails);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('Token');
        expect(response.body).toHaveProperty('Email');
    });

    it('should return error if incorect password ', async () => {
        const loginDetails = {
            email: 'victor@gmail.com',
            Password: '12345',
        };
        const response = await api
            .post('/api/v1/auth/login')
            .send(loginDetails);
        expect(response.status).toBe(401);
    });
});
