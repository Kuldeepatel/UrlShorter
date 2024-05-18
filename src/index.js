const express = require("express");
const app = express();
const cors = require('cors');
const {ConnectDB} = require('./DataBase/DB');
const urlRoutes = require('./routes/urlRoutes');
require('dotenv').config()
// Middleware
app.use(express.json());
app.use(cors({ origin: "https://client-opal-nine.vercel.app" }));

// Connect to MongoDB
ConnectDB();

// routes
app.use('/', urlRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running at port : ${process.env.PORT}`);
});
