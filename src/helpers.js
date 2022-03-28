/* gets list of potential stock symbols for autofill feature */
export const searchSymbols = (symbol) => {
  return fetch('/api/symbols/' + symbol)
    .then(res => res.json())
    .then(response => { return response });
};
/* gets stock information for entered symbol, can also filter by date or date range */
export const searchStocks = (symbol, startDate, endDate) => {
  let url = '/api/stocks/' + symbol;
  if (startDate || endDate) url += '?';
  if (startDate) {
    startDate = parseDate(startDate);
    url += 'startDate=' + startDate;
  }
  if (startDate && endDate) url += '&';
  if (endDate) {
    endDate = parseDate(endDate);
    url += 'endDate=' + endDate;
  }
  return fetch(url)
    .then(res => res.json())
    .then(response => { return response });
};
/* parses date format from datepicker into human readable string */
const parseDate = (date) => {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  return new Date(year + '-' + month + '-' + day).toISOString().slice(0, 10);
}
