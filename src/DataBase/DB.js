const mongoose = require('mongoose');

const ConnectDB = async () => {

        await mongoose.connect(`${process.env.DATABASE_URL}`)
        .then(() => {console.log("MongoDB Connected");})
        .catch((err) =>{console.error(`MongoDB Connection Failed ${err}`)})
};

module.exports = {
    ConnectDB
};
