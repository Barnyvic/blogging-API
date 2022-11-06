const supertest = require('supertest');
const UserModel = require('../Model/UserModel');
const blogModel = require('../Model/BlogModel');
const mongoose = require('mongoose');
const app = require('../index');
const { dbConnection } = require('../database/dbConfig');

const api = supertest(app);

describe('Create a blog , get all blogs , delete and update a perticular blog post', () => {
    beforeAll(async () => {
        await dbConnection();
    });

    afterAll(async () => {
        await mongoose.connection.close();
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
