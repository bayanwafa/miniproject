const express = require('express'); // We import the express application
require("dotenv").config();
const cors = require('cors'); // Necessary for localhost
const morgan = require('morgan');
const middleware = require('./utils/middleware'); // Importing middleware configuration
const currencyRoutes = require('./routes/currencyRoutes');

const app = express(); // Create an express application

/**
 * Initial application setup
 * We need to use cors so we can connect to a localhost later
 * We need express.json so we can receive requests with JSON data attached
 */
app.use(cors());
app.use(express.json());

// Middleware setup
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req[body]'));

// Use currencyRoutes for '/api/currency'
app.use('/api/currency', currencyRoutes);


// Unknown endpoint handler
app.use((request, response) => {
  response.status(404).json({ error: 'Unknown endpoint' });
});


// Server setup
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
});