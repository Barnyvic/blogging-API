const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

mongoose.Promise = global.Promise;

class Connection {
    constructor() {
        this.mongoServer = MongoMemoryServer.create();
        this.connection = null;
    }

    async Connect() {
        this.mongoServer = await MongoMemoryServer.create();
        const mongoUrl = (await this.mongoServer).getUri();

        this.connection = await mongoose.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }

    async disConnect() {
        await mongoose.disconnect();
        await (await this.mongoServer).stop();
    }

    async cleanUp() {
        const models = Object.keys(this.connection.models);
        const promises = [];
        models.map((model) => {
            promises.push(this.connection.models[model].deleteMany({}));
        });

        await Promise.all(promises);
    }
}

/**
 * Create the initial database connection.
 *
 * @async
 * @return {Promise<Object>}
 */
exports.connect = async () => {
    const conn = new Connection();
    await conn.connect();
    return conn;
};
