const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const createToken = (user) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not configured');
    }

    return jwt.sign(
        { id: user._id.toString(), email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

const registerUser = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ success: false, message: 'An account with this email already exists' });
        }

        const passwordHash = await bcrypt.hash(password, 12);
        const user = await User.create({ email, passwordHash });
        const token = createToken(user);

        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: { user: { id: user._id, email: user.email }, token }
        });
    } catch (error) {
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+passwordHash');

        if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        const token = createToken(user);
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            data: { user: { id: user._id, email: user.email }, token }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerUser,
    loginUser
};
