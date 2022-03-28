import { configureStore } from '@reduxjs/toolkit';

import StockReducer from './reducers/StockReducer';

export default configureStore({
  reducer: {
    stocks: StockReducer
  },
})
