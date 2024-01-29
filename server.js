const express = require('express'); // We import the express application
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

app.use('/api/currency', currencyRoutes);


/**
 * TESTING Endpoint (Completed)
 * @receives a get request to the URL: http://localhost:3001/
 * @responds with the string 'Hello World!'
 */
app.get('/', (request, response) => {
  response.send('Hello World!')
})

/**
 * TODO: GET Endpoint
 * @receives a get request to the URL: http://localhost:3001/api/currency/
 * @responds with returning the data as a JSON
 */
app.get('/api/currency/', (request, response) => {
  response.json(currencies)
})


app.get('/favicon.ico', (request, response) => {
  response.status(204).end();
});


// Server setup
const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
});