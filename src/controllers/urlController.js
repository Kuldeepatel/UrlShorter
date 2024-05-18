const { Url } = require('../models/urlModel');
const shortUniqueId = require("short-unique-id");
const uid = new shortUniqueId();

// for Create ShortUrl
const createShortUrl = async (req, res) => {
    try {
        const { fullUrl } = req.body;
        let url = await Url.findOne({ fullUrl });

        if (url) {
            return setTimeout(()=> {
                res.status(200).json({
                    message: "Short URL Already Exists.",
                    shortUrl: `http://localhost:5000/${url.shortUrl}`
                });
            },5000) 
        }

        const shortID = uid.randomUUID(5);
        url = await Url.create({ fullUrl, shortUrl: shortID });

        setTimeout(() => {
            res.status(201).json({
                message: "Short URL Created Successfully.",
                shortUrl: `http://localhost:5000/${url.shortUrl}`
            });
        },5000)
    } catch (error) {
        console.error("Error creating short URL:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// for redirect to Url
const redirectToOriginalUrl = async (req, res) => {
    try {
        const { shortUrl } = req.params;
        const url = await Url.findOne({ shortUrl });
        if (url) {
         
          return res.redirect(url.fullUrl);
        } else {
          return res.status(404).json({ error: "Short URL not found" });
        }
      } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
};

module.exports = { createShortUrl, redirectToOriginalUrl };
