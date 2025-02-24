const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// Import Routes
const articleRoutes = require('./routes/articleRoutes');
const categorieRoutes = require('./routes/categorieRoutes');
const marqueRoutes = require('./routes/marqueRoutes');

// Middlewares
app.use(cors());
app.use(bodyParser.json());  // Use body-parser middleware to parse JSON request body

// Use the routes
app.use('/api/articles', articleRoutes);   // Use the article routes here
app.use('/api/categories', categorieRoutes);
app.use('/api/marques', marqueRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});
