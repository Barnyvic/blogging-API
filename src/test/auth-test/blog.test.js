const supertest = require('supertest');
const { connect } = require('../dataBase/database');
const app = require('../../index');
const UserModel = require('../../Model/UserModel');

const api = supertest(app);

describe('Create a blog , get all blogs , delete and update a perticular blog post', () => {
    let conn;
    let token;



    beforeAll(async () => {
        conn = await connect();

         const loginDetails = {
             email: 'victor@gmail.com',
             Password: '1234567',
         };

        const loginResponse = await api
            .post('/api/v1/auth/login')
            .send(loginDetails);

        token = loginResponse.body.token;


    });

    afterEach(async () => {
        await conn.cleanup();
    });

    afterAll(async () => {
        await conn.disconnect();
    });

    it('should create a new blog post ', async () => {
        // const user = await UserModel.findById();

        const newBlog = {
            title: 'This is a new blog',
            description: 'This is a new blog description',
            body: 'This is a new blog i love coding very well',
            tags: ['food', 'beans'],
        };

        const response = await api.post('/api/v1/articles').send(newBlog);

        // user.article = user.article.concat(newBlog._id);
        // await user.save();

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
    });
});
