const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { auth, authorize } = require('../middleware/auth');

// Create PG Property (Owner only)
router.post('/create', auth, authorize(['owner']), async (req, res) => {
  try {
    const { name, address, totalRooms, totalBeds } = req.body;
    
    const [result] = await db.query(
      'INSERT INTO pg_properties (name, address, owner_id, total_rooms, total_beds) VALUES (?, ?, ?, ?, ?)',
      [name, address, req.user.id, totalRooms, totalBeds]
    );

    res.status(201).json({
      message: 'PG property created successfully',
      pgId: result.insertId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Owner's PG Properties
router.get('/my-properties', auth, authorize(['owner']), async (req, res) => {
  try {
    const [properties] = await db.query(
      'SELECT * FROM pg_properties WHERE owner_id = ?',
      [req.user.id]
    );

    res.json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Pending Resident Requests for Owner's PGs
router.get('/resident-requests', auth, authorize(['owner']), async (req, res) => {
  try {
    const [requests] = await db.query(`
      SELECT rr.*, u.firstName, u.lastName, u.email, u.phone 
      FROM resident_requests rr
      JOIN users u ON rr.user_id = u.id
      WHERE rr.status = 'pending'
      ORDER BY rr.created_at DESC
    `);

    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;