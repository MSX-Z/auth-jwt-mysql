const express = require('express');
const router = express.Router();

const controller = require('../controller/auth');
const { verifyAccessToken, verifyRefreshToken } = require('../middleware/verify_token');

// get
router.get('/auth', verifyAccessToken, controller.verifyAccessToken);

// post
router.post('/refresh_token', verifyRefreshToken, controller.verifyRefreshToken);
router.post('/login', controller.login);
router.post('/register', controller.register);
router.post('/logout', verifyAccessToken, controller.logout);

module.exports = router;