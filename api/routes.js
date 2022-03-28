const request = require('request');
const express = require('express');
const router = express.Router();
const { filterSymbols, filterDateRange, combineTimes, parseStock } = require('./helpers');
/* returns list of potential stock symbols */
router.get('/symbols/:symbol', (req, res) => {
  const url = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=' + req.params.symbol + '&apikey=STV4VE65LIPYJPLC';
  let response, statusCode;
  request.get(url, (err, resp, data) => {
    const bestMatches = JSON.parse(data).bestMatches;
    if (!err && resp.statusCode === 200 && bestMatches) {
      const symbols = filterSymbols(bestMatches);
      statusCode = 200;
      response = {
        status: 'ok',
        data: symbols
      };
    } else {
      statusCode = 404;
      response = {
        status: 'error',
        message: 'The requested stock symbol is invalid.'
      };
    }
    res.status(statusCode).send(response);
  });
});
/* returns stock information for specified symbol and date range */
router.get('/stocks/:symbol', (req, res) => {
  const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + req.params.symbol + '&interval=5min&outputsize=full&apikey=STV4VE65LIPYJPLC';
  let response, statusCode;
  request.get(url, (err, resp, data) => {
    const timeSeries = JSON.parse(data)['Time Series (5min)'];
    if (!err && resp.statusCode === 200 && timeSeries) {
      const filteredTimes = filterDateRange(timeSeries, req.query.startDate, req.query.endDate);
      const combinedTimes = combineTimes(filteredTimes, req.query.startDate, req.query.endDate);
      const stock = parseStock(combinedTimes);
      statusCode = 200;
      response = {
        status: 'ok',
        data: stock
      };
    } else {
      statusCode = 404;
      response = {
        status: 'error',
        message: 'The requested stock symbol could not be found.'
      };
    }
    res.status(statusCode).send(response);
  });
});

module.exports = router;
