import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from 'react-redux';

import { setSymbols, setStocks } from '../../reducers/StockReducer';

import { searchSymbols, searchStocks } from '../../helpers';

import AutocompleteList from '../AutocompleteList/AutocompleteList';

import './StockSearch.css';
import "react-datepicker/dist/react-datepicker.css";

const StockSearch = () => {
  const [keyword, setKeyword] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [hideAutocompleteList, setHideAutocompleteList] = useState(true);
  const dispatch = useDispatch();

  const typeSearch = async (symbol) => {
    setKeyword(symbol);
    setHideAutocompleteList(false);
    if (symbol.length > 0) {
      const response = await searchSymbols(symbol);
      dispatch(setSymbols(response.data));
    }
  };

  const closeAutocompleteList = () => {
    setHideAutocompleteList(true);
  }

  const selectSymbol = (symbol) => {
    setKeyword(symbol);
    closeAutocompleteList();
  }

  const submitSearch = async () => {
    if (keyword) {
      const response = await searchStocks(keyword, startDate, endDate);
      dispatch(setStocks(response.data));
    } else {
      dispatch(setStocks(null));
    }
  }

  return (
    <div className="stockSearch">
      <div className="formGroup">
        <label>Stock Symbol</label>
        <div className="searchInput">
          <IoIosSearch color="#9EA0A4" size="1.5em" />
          <input type='text' name='symbol' placeholder='Search by Symbol' onChange={e => typeSearch(e.target.value)} value={keyword} autoComplete='off' />
          { (keyword.length > 0 && !hideAutocompleteList) ? <AutocompleteList closeAutocompleteList={closeAutocompleteList} selectSymbol={selectSymbol} /> : null }
        </div>
      </div>
      <div className="formGroup">
        <label>Select Date Range</label>
        <DatePicker placeholderText="Start Date" selected={startDate} onChange={(date) => setStartDate(date)} />
        <DatePicker placeholderText="End Date" selected={endDate} onChange={(date) => setEndDate(date)} />
      </div>
      { ((endDate >= startDate) || (startDate && !endDate)) ?
        <div className="formGroup">
          <div className="button" onClick={submitSearch}>Search</div>
        </div> :
        <div className="formGroup">
          <div className="button disabledButton">Search</div>
        </div>
      }
    </div>
  );
}

export default StockSearch;
