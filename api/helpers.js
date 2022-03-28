module.exports = {
  /* filters out US only symbols from response */
  filterSymbols: (bestMatches) => {
    const symbols = bestMatches.filter((symbol) => {
      return symbol['4. region'] === 'United States';
    });
    return symbols;
  },
  /* filters out times from response specified by date or date range */
  filterDateRange: (timeSeries, startDate, endDate) => {
    let date;
    /* single date selected */
    if ((startDate && !endDate) || (!startDate && endDate) || (startDate && endDate && startDate === endDate)) {
      if (startDate) date = startDate;
      if (endDate) date = endDate;
      timeSeries = Object.keys(timeSeries).filter((time) => {
        return time.includes(date);
      }).reduce((obj, time) => {
        obj[time] = timeSeries[time];
        return obj;
      }, {});
    /* date range selected */
    } else if (startDate && endDate && startDate !== endDate) {
      timeSeries = Object.keys(timeSeries).filter((time) => {
        startDate = new Date(startDate);
        endDate = new Date(endDate);
        date = new Date(time.slice(0, 10));
        return date >= startDate && date <= endDate;
      }).reduce((obj, time) => {
        obj[time] = timeSeries[time];
        return obj;
      }, {});
    }
    return timeSeries;
  },
  /* combines stock information into time groups, depending on date or date range */
  combineTimes: (timeSeries, startDate, endDate) => {
    const stock = Object.keys(timeSeries).reduce((arr, time) => {
      const hour = time.slice(11, 13);
      const date = time.slice(0, 10);
      const timeGroup = arr.find((item) => {
        /* no timeGroups created yet */
        if (!item) return null;
        /* single date selected, timeGroups separated hourly */
        if ((startDate && !endDate) || (!startDate && endDate) || (startDate && endDate && startDate === endDate)) {
          return date === item['timestamp'].slice(0, 10) && hour === item['timestamp'].slice(11, 13);
        /* date range or no dates selected, timeGroups separated daily */
        } else {
          return date === item['timestamp'].slice(0, 10);
        }
      });
      if (timeGroup) {
        timeGroup['5. volume'] = (parseInt(timeGroup['5. volume']) + parseInt(timeSeries[time]['5. volume'])).toString();
        timeGroup['1. open'] = timeSeries[time]['1. open'];
        if (parseFloat(timeSeries[time]['3. low']) < parseFloat(timeGroup['3. low'])) timeGroup['3. low'] = timeSeries[time]['3. low'];
        if (parseFloat(timeSeries[time]['2. high']) > parseFloat(timeGroup['2. high'])) timeGroup['2. high'] = timeSeries[time]['2. high'];
      } else {
        timeSeries[time]['timestamp'] = time;
        arr.push(timeSeries[time]);
      }
      return arr;
    }, []);
    return stock;
  },
  /* parses the response into an array for ag-grid */
  parseStock: (timeSeries) => {
    const stock = timeSeries.reduce((arr, time) => {
      arr.push({
        'timestamp': new Date(time['timestamp']).toUTCString(),
        'total volume': time['5. volume'],
        'min price': time['3. low'],
        'max price': time['2. high'],
        'opening price': time['1. open'],
        'closing price': time['4. close']
      });
      return arr;
    }, []);
    return stock;
  }
};
