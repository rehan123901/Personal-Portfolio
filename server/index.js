const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
const clientOrigin = process.env.CLIENT_ORIGIN;

const allowedOrigins = ['http://localhost:5173'];
if (clientOrigin) allowedOrigins.push(clientOrigin);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without origin (like curl or health checks).
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'));
    }
  })
);
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, message: 'Server is running' });
});

app.get('/api/resume', (_req, res) => {
  res.json({
    name: 'Syed Rehan Ahmed',
    role: 'MERN Stack Developer',
    email: 'srehanahmed59@gmail.com',
    contact: '+916309723296',
    github: 'https://github.com/rehan123901',
    linkedin: 'https://www.linkedin.com/in/rehanahmed-syed-17ba73378',
    leetcode: 'https://leetcode.com/problemset/'
  });
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
