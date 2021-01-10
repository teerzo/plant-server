const mongoose = require('mongoose');

const connectToDatabase = async (req, res) => {
    let conn = null;
    if (process.env.MONGO_URI) {
        const query = '';
        // const query = '?authSource=admin&replicaSet=atlas-6bavsy-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';
        const CONNECTION_URL = `${process.env.MONGO_URI}${query}`;
        // const PORT = process.env.PORT || 5000;
        try {
            conn = mongoose.createConnection(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
            await conn;
            return conn;
        }
        catch (error) {
            console.log(`${error} did not connect`)
        }
    }
    else {
        console.log('failed to connect');
        res.status(500).json({ message: 'failed to connect to database' });
    }
};

module.exports = connectToDatabase;