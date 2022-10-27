const { dbConnection } = require('./database/dbConfig');
const app = require('./index');
require('dotenv').config();
const Port = process.env.PORT || 4005;

// connecting to database
dbConnection();

app.listen(Port, () => {
    console.log(`Server listening on ${Port}`);
});
