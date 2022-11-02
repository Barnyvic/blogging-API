const { dbConnection } = require('./database/dbConfig');
const app = require('./index');
require('dotenv').config();
const Port = process.env.PORT || 4005;

// connecting to database

app.listen(Port, async () => {
    await dbConnection();
    console.log(`Server listening on ${Port}`);
});
