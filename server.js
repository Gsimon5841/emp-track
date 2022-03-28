const db = require('./db/connection');
const express = require('express');
const PORT = process.env.PORT || 3002;
const app = express();
const { query } = require('express');
const verification = require('./utils/verification');
const apiRoutes = require('./routes/apiRoutes');

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', apiRoutes);







  app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });