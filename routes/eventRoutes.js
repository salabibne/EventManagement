const express = require('express');
const {
searchEvents,
  addEvent,
  getEvents,
  joinEvent,
  getMyEvents,
  updateEvent,
  deleteEvent,
  getMyEventsOnEdit,
} = require('../controllers/eventController');

const protect = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', protect, getEvents);
router.get('/search', protect, searchEvents);
router.post('/', protect, addEvent);
router.get('/my', protect, getMyEvents);
router.get('/my/:id', protect, getMyEventsOnEdit);
router.put('/:id', protect, updateEvent);
router.delete('/:id', protect, deleteEvent);
router.post('/join/:id', protect, joinEvent);

module.exports = router;
