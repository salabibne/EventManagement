const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () =>
  console.log(`✅ Server running on http://0.0.0.0:${PORT}`)
);
