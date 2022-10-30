const supertest = require('supertest');
const UserModel = require('../Model/UserModel');
const blogModel = require('../Model/BlogModel');
const mongoose = require('mongoose');
const app = require('../index');
const { dbConnection } = require('../database/dbConfig');

const api = supertest(app);

describe('signup', () => {
    beforeAll(async () => {
        await dbConnection();
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create a new user ', async () => {
        const newUser = {
            email: 'barnyvictor@gmail.com',
            password: '1234tyr',
            firstname: 'Gifty',
            lastname: 'John',
            username: 'johner',
            confirmPassword: '1234tyr',
        };
        const response = await api.post('/register').send(newUser);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
    }, 120000);

    it('should log a user in ', async () => {
        const loginDetails = {
            email: 'barnyvictor@gmail.com',
            password: '1234tyr',
        };
        const response = await supertest(app).post('/login').send(loginDetails);
        expect(response.status).toBe(200);
    });
});
