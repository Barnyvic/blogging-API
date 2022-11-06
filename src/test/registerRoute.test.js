const supertest = require('supertest');
const UserModel = require('../Model/UserModel');
const blogModel = require('../Model/BlogModel');
const mongoose = require('mongoose');
const app = require('../index');
const { dbConnection } = require('../database/dbConfig');

const api = supertest(app);

describe('sign up and login a user', () => {
    beforeAll(async () => {
        await dbConnection();
    });

    afterAll(async () => {
        await mongoose.connection.close();
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
