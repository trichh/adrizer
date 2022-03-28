import { createSlice } from '@reduxjs/toolkit';

export const StockReducer = createSlice({
  name: 'stocks',
  initialState: {
    stock: null,
    symbols: null
  },
  reducers: {
    setStocks: (state, action) => {
      state.stock = action.payload;
    },
    setSymbols: (state, action) => {
      state.symbols = action.payload;
    }
  }
});

export const { setStocks, setSymbols } = StockReducer.actions;

export default StockReducer.reducer;
