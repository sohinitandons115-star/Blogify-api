const express= require('express');
const router = express.Router();
const { body } = require('express-validator');

const userController = require('../controllers/user.controller');
router.use((req, res, next) => {
    console.log(`User route accessed: ${req.method} ${req.url}`);
    next();
});

const registrationRules= [
    body('email').isEmail().withMessage('Please provide a valid email address').normalizeEmail(),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
];

router.get('/', (req, res) => {
    res.json({ message: 'User route is working!' });
});

router.post('/register', registrationRules, userController.registerUser);
router.post('/login', registrationRules, userController.loginUser);

module.exports = router;
