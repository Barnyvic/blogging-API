const supertest = require('supertest');
const UserModel = require('../Model/UserModel');
const app = require('../index');
const { dbConnection } = require('../database/dbConfig');

describe('signup', () => {
    let connection;
    beforeAll(async () => {
        connection = await dbConnection();
    });

    afterEach(async () => {
        await connection.cleanup();
    });

    afterAll(async () => {
        await connection.disconnect();
    });

    it('should create a new user ', async () => {
        const response = await supertest(app).post('/signup').send({
            email: 'barnyvictor@gmail.com',
            password: '1234tyr',
            firstname: 'Gifty',
            lastname: 'John',
            username: 'johner',
            confirmPassword: '1234tyr',
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message');
    });

    // it('should log a user in ', async () => {
    //     const loginDetails = {
    //         email: 'victorbarny4@gmail.com',
    //         password: 'Yungvicky007',
    //     };
    //     const response = await supertest(app).post('/login').send(loginDetails);
    //     expect(response.status).toBe(200);
    //     expect(response.cookie).toHaveProperty('token');
    // });
});
