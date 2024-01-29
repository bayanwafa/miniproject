const express = require('express'); // We import the express application
const cors = require('cors'); // Necessary for localhost
const app = express(); // Creates an express application in app
const morgan = require('morgan');

/**
 * Initial application setup
 * We need to use cors so we can connect to a localhost later
 * We need express.json so we can receive requests with JSON data attached
 */
app.use(cors());
app.use(express.json());

// Middleware setup
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req[body]'));


/**
 * DATA STORAGE
 * We're using a local variable 'currencies' to store our data: a list of currency objects
 * Each object represents a 'currency', and contains the following fields
 * id: a number, 
 * currencyCode: a string, three letters (see https://www.iban.com/currency-codes as reference)
 * country: a string, the name of the country
 * conversionRate: the amount, in that currency, required to equal 1 Canadian dollar
 */
let currencies = [
  {
    id: 1,
    currencyCode: "CDN",
    country: "Canada",
    conversionRate: 1
  },
  {
    id: 2,
    currencyCode: "USD",
    country: "United States of America",
    conversionRate: 0.75
  }
];

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

/**
 * TODO: GET:id Endpoint
 * @receives a get request to the URL: http://localhost:3001/api/currency/:id
 * @responds with returning specific data as a JSON
 */
// GET a specific currency by ID
app.get('/api/currency/:id', (request, response) => {
  const id = parseInt(request.params.id);
  const currency = currencies.find(curr => curr.id === id);

  if (currency) {
    response.json(currency);
  } else {
    response.status(404).json({ error: 'Resource not found' });
  }
});


/**
 * TODO: POST Endpoint
 * @receives a post request to the URL: http://localhost:3001/api/currency,
 * with data object enclosed
 * @responds by returning the newly created resource
 */
// POST a new currency
app.post('/api/currency/', (request, response) => {
  const newCurrency = request.body;

  // Check if required information is missing
  if (!newCurrency || !newCurrency.currencyCode || !newCurrency.country || !newCurrency.conversionRate) {
    response.status(400).json({ error: 'Content missing' });
    return;
  }

  currencies = currencies.concat(newCurrency);
  response.json(newCurrency);
});


/**
 * TODO: PUT:id endpoint
 * @receives a put request to the URL: http://localhost:3001/api/currency/:id/:newRate
 * with data object enclosed
 * Hint: updates the currency with the new conversion rate
 * @responds by returning the newly updated resource
 */
// PUT update a currency's conversion rate by ID
app.put('/api/currency/:id/:newRate', (request, response) => {
  const id = parseInt(request.params.id);
  const newRate = parseFloat(request.params.newRate);

  currencies = currencies.map(curr => {
    if (curr.id === id) {
      return { ...curr, conversionRate: newRate };
    }
    return curr;
  });

  const updatedCurrency = currencies.find(curr => curr.id === id);
  if (updatedCurrency) {
    response.json(updatedCurrency);
  } else {
    response.status(404).json({ error: 'Currency not found' });
  }
});


/**
 * TODO: DELETE:id Endpoint
 * @receives a delete request to the URL: http://localhost:3001/api/currency/:id,
 * @responds by returning a status code of 204
 */
// DELETE a currency by ID
app.delete('/api/currency/:id', (request, response) => {
  const id = parseInt(request.params.id);
  currencies = currencies.filter(curr => curr.id !== id);
  response.status(204).send();
});


// Unknown endpoint handler
app.use((request, response) => {
  response.status(404).json({ error: 'Unknown endpoint' });
});



// Server setup
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
});