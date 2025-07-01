const Event = require('../models/Event');

exports.addEvent = async (req, res) => {
  const { title, hostName, dateTime, location, description } = req.body;

  const event = await Event.create({
    title,
    hostName,
    dateTime,
    location,
    description,
    creator: req.user._id,
  });

  res.status(201).json(event);
};

exports.searchEvents = async (req, res) => {
 const searchTerm = req.query.search;

  let query = {};

  if (searchTerm) {
    query.title = { $regex: searchTerm, $options: 'i' }; 
  }

  const events = await Event.find(query).sort({ dateTime: -1 });
  res.json(events);
}

exports.getEvents = async (req, res) => {
  const events = await Event.find().sort({ dateTime: -1 });
  res.json(events);
};

exports.joinEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) return res.status(404).json({ message: 'Event not found' });
  if (event.joinedUsers.includes(req.user._id))
    return res.status(400).json({ message: 'Already joined' });

  event.attendeeCount++;
  event.joinedUsers.push(req.user._id);
  await event.save();

  res.json({ message: 'Joined successfully' });
};

exports.getMyEvents = async (req, res) => {
  const events = await Event.find({ creator: req.user._id });
  res.json(events);
};

exports.getMyEventsOnEdit = async (req, res) => {
  const authorizePerson =await Event.find({ creator: req.user._id });
  if(!authorizePerson)return res.status(404).json({ message: 'You are not a event Creator' });
 const event = await Event.findById(req.params.id);
 if (!event) return res.status(404).json({ message: 'Event not found' });
  res.json(event);
};

exports.updateEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
 
  if (!event) return res.status(404).json({ message: 'Event not found' });

  if (!event.creator.equals(req.user._id))
    return res.status(403).json({ message: 'Not allowed' });

  Object.assign(event, req.body);
  await event.save();

  res.json(event);
};

exports.deleteEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: 'Event not found' });

  if (!event.creator.equals(req.user._id))
    return res.status(403).json({ message: 'Not allowed' });

  await event.deleteOne({_id: req.params.id});
  res.json({ message: 'Event deleted' });
};
