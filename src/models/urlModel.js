const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
    fullUrl: {
        type: String,
        required: true,
        unique: true
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});

const Url = mongoose.model("Url", UrlSchema);

module.exports = {
    Url
};
