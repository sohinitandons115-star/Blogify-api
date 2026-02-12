const {validationResult} = require('express-validator');

const registerUser = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    // Here you would typically hash the password and save the user to the database
    res.status(201).json({ message: 'User registered successfully', user: { email } });
};

module.exports = {
    registerUser
};