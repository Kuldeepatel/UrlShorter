const express = require("express");
const app = express();
const shortUniqueId = require("short-unique-id");
const { ConnectDB } = require('./DB');
const { Url } = require('./models/urlModel');

ConnectDB();

app.use(express.json());

const uid = new shortUniqueId();

app.post('/api/v1/', async (req, res) => {
   try {
     const { fullUrl } = req.body;
     
     const existingUrl = await Url.findOne({ fullUrl });

     if (existingUrl) {
        res.status(200).json({
            message: "Short URL Already Exists.",
            shortUrl: existingUrl.shortID
        });
     } else {
        const shortID = uid.randomUUID(5);

        
        await Url.create({
            fullUrl,
            shortUrl:shortID
        });

        res.status(201).json({
            message: "Short URL Created Successfully.",
            shortUrl: shortID
        });
     }
   } catch (error) {
        res.status(500).json({ error: error.message });
   }
});

app.listen(3000, () => {
    console.log(`Server is running at port 3000`);
});
