const express = require('express');
const router = express.Router();
const { createShortUrl, redirectToOriginalUrl } = require('../controllers/urlController');

router.post("/api/v1/shorter", createShortUrl);
router.get("/:shortUrl", redirectToOriginalUrl);

module.exports = router;
