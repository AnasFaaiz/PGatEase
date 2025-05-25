const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { auth, authorize } = require('../middleware/auth');

// Create Room (Owner only)
router.post('/create', auth, authorize(['owner']), async (req, res) => {
  try {
    const { pgId, roomNumber, bedCount, rentAmount } = req.body;
    
    // Verify PG belongs to owner
    const [pg] = await db.query(
      'SELECT * FROM pg_properties WHERE id = ? AND owner_id = ?',
      [pgId, req.user.id]
    );
    
    if (pg.length === 0) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const [result] = await db.query(
      'INSERT INTO rooms (room_number, pg_id, bed_count, rent_amount) VALUES (?, ?, ?, ?)',
      [roomNumber, pgId, bedCount, rentAmount]
    );

    res.status(201).json({
      message: 'Room created successfully',
      roomId: result.insertId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Rooms for a PG
router.get('/pg/:pgId', auth, async (req, res) => {
  try {
    const [rooms] = await db.query(
      'SELECT * FROM rooms WHERE pg_id = ?',
      [req.params.pgId]
    );

    res.json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;