const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const AssistantDoctor = require('../models/AssistantDoctor');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Login Route
router.post('/login', async (req, res) => {
    const { phoneNumber, password, role } = req.body;
    let user;

    try {
        console.log(`Role: ${role}`); // Debugging
        console.log(`Phone Number: ${phoneNumber}`); // Debugging

        if (role === 'admin') {
            user = await Admin.findOne({ phoneNumber });
        } else if (role === 'assistantDoctor') {
            user = await AssistantDoctor.findOne({ phoneNumber });
        }

        console.log(`User Found: ${user}`); // Debugging

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Directly compare the plaintext password
        if (password !== user.password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error(err); // Debugging
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
