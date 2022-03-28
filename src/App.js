import StockSearch from './components/StockSearch/StockSearch';
import StockTable from './components/StockTable/StockTable';

import './App.css';

const App = () => {
  return (
    <>
      <h1>Stock Information</h1>
      <div className="stockContainer">
        <StockSearch />
        <StockTable />
      </div>
    </>
  );
}

export default App;
