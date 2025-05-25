const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const { registerValidation, loginValidation, validate } = require('../middleware/validate');

// Register route with validation
router.post('/register', registerValidation, validate, async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, role } = req.body;

    // Check if user exists
    const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const [result] = await db.query(
    'INSERT INTO users (firstName, lastName, email, phone, password, role, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [firstName, lastName, email, phone, hashedPassword, role, role === 'resident' ? 'pending_assignment' : 'active']
    );

    const userId = result.insertId;

    // Handle role-specific logic
    if (role === 'owner') {
      // Owners can immediately access the system
      const token = jwt.sign(
        { id: userId, role: role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      res.status(201).json({
        message: 'Owner registered successfully',
        token,
        user: {
          id: userId,
          firstName,
          lastName,
          email,
          role
        }
      });
    } else if (role === 'resident') {
      // Residents need to be approved/assigned to a room by an owner
      res.status(201).json({
        message: 'Resident registered successfully. Please wait for room assignment by your PG owner.',
        user: {
            id: userId,
            firstName,
            lastName,
            email,
            phone,
            role,
            status: 'pending_assignment'
        }
        });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/resident-request', async (req, res) => {
  try {
    const { email, pgName, preferredBudget, message } = req.body;

    // Find the user
    const [users] = await db.query('SELECT * FROM users WHERE email = ? AND role = ?', [email, 'resident']);
    if (users.length === 0) {
      return res.status(404).json({ message: 'Resident not found' });
    }

    const user = users[0];
    //
// Pratyaksha

    // Insert resident request
    await db.query(
      'INSERT INTO resident_requests (user_id, pg_name, preferred_budget, message) VALUES (?, ?, ?, ?)',
      [user.id, pgName, preferredBudget, message]
    );

    res.json({ message: 'Request submitted successfully. You will be contacted soon.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', loginValidation, validate, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user exists
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const user = users[0];

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check user status for residents
    if (user.role === 'resident' && user.status === 'pending_assignment') {
      return res.status(403).json({ 
        message: 'Your account is pending room assignment. Please contact your PG owner.',
        status: 'pending_assignment'
      });
    }

    if (user.status === 'inactive') {
      return res.status(403).json({ message: 'Your account has been deactivated.' });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        status: user.status
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;