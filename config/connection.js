const { connect, connection } = require('mongoose');

const connectionString = process.env.MONGODB_URI || "mongodb://localhost/danbookdb";
connect(connectionString, {
    useNewUrlPArser: true,
    useUnifiedTopology: true,
});

module.exports = connection;