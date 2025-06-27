const express = require('express');
const authController = require('../controllers/authController.cjs');

const router = express.Router();

router.post('/createUser', authController.createUser);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

module.exports = router;