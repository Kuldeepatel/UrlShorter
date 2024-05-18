const mongoose = require('mongoose');

const ConnectDB = async () => {

        await mongoose.connect(`mongodb+srv://patelkuldip1308:Kuldip1234@url.xkopjzo.mongodb.net/?retryWrites=true&w=majority&appName=Url`)
        .then(() => {console.log("MongoDB Connected");})
        .catch((err) =>{console.error(`MongoDB Connection Failed ${err}`)})
};

module.exports = {
    ConnectDB
};
