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
        const user = await UserModel.findById(req.user._id);
    });
});
