const express = require("express");
const app = express();
const cors = require('cors');
const {ConnectDB} = require('./DataBase/DB');
const urlRoutes = require('./routes/urlRoutes');

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

// Connect to MongoDB
ConnectDB();

// routes
app.use('/', urlRoutes);

app.listen(5000, () => {
    console.log(`Server is running at port : 5000`);
});
