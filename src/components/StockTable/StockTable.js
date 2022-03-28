import { useSelector } from 'react-redux';
import { AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import './StockTable.css';

const StockTable = () => {
  const stock = useSelector((state) => state.stocks.stock);
  const columnDefs = [
    { field: 'timestamp' },
    { field: 'total volume' },
    { field: 'min price' },
    { field: 'max price' },
    { field: 'opening price' },
    { field: 'closing price' },
  ];

  return (
    <div className="stockTable">
      { (stock) ?
        <div className="ag-theme-alpine">
          <AgGridReact columnDefs={columnDefs} defaultColDef={{resizable: true}} rowData={stock} onGridReady={e => e.api.sizeColumnsToFit()} onGridSizeChanged={e => e.api.sizeColumnsToFit()}></AgGridReact>
       </div> : <p>No Results Found</p>
      }
    </div>
  );
}

export default StockTable;
