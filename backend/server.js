import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import subscribeRoutes from './routes/subscribe.js';

const app = express();
const PORT = process.env.PORT || 5000;

// only let our React app talk to this server
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

app.use('/api/subscribe', subscribeRoutes);

// anything else is a 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// catches things like broken JSON in the request body
app.use((err, req, res, next) => {
  console.error('Server error:', err.message);
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Request body is not valid JSON' });
  }
  res.status(500).json({ message: 'Something went wrong on the server' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
