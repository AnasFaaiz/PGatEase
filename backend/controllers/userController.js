const db = require('../config/db');

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const [users] = await db.query(
      'SELECT id, firstName, lastName, email, phone, role FROM users WHERE id = ?',
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(users[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const { firstName, lastName, phone } = req.body;
    
    await db.query(
      'UPDATE users SET firstName = ?, lastName = ?, phone = ? WHERE id = ?',
      [firstName, lastName, phone, req.user.id]
    );

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile
};