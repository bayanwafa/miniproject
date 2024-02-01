// routes/currencyRoutes.js
const express = require('express');
const router = express.Router();

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
 * TODO: GET Endpoint
 * @receives a get request to the URL: http://localhost:3003/
 * @responds with returning the data as a JSON
 */
router.get('/', (request, response) => {
  response.json(currencies);
});


/**
 * TODO: GET:id Endpoint
 * @receives a get request to the URL: http://localhost:3001/api/currency/:id
 * @responds with returning specific data as a JSON
 */
// GET a specific currency by ID
router.get('/:id', (request, response) => {
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
router.post('/', (request, response) => {
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
router.put('/:id/:newRate', (request, response) => {
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
router.delete('/:id', (request, response) => {
  const id = parseInt(request.params.id);
  currencies = currencies.filter(curr => curr.id !== id);
  response.status(204).send();
});


module.exports = router;
