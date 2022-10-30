const supertest = require('supertest');
const UserModel = require('../Model/UserModel');
const mongoose = require('mongoose');
const app = require('../index');
const { dbConnection } = require('../database/dbConfig');

const api = supertest(app);
