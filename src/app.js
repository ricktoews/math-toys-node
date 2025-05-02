const express = require('express');
const cors = require('cors');
const mathRoutes = require('./routes/mathRoutes');

const app = express();
const port = 3000;

// Allow requests from localhost:3000 (and optionally others)
app.use(cors({
  origin: ['http://localhost:3000'], // Add your Next.js app's origin
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Mount API routes under /api
app.use('/api', mathRoutes);

// Basic error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
