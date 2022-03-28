import { useEffect, useRef } from "react";
import { useSelector } from 'react-redux';

import './AutocompleteList.css';

const AutocompleteList = (props) => {
  const autocompleteOptions = useSelector((state) => state.stocks.symbols);
  const ref = useRef(null);

  useEffect(() => {
    document.addEventListener('click', (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        props.closeAutocompleteList();
      }
    });
  }, []);

  return (
    <div ref={ref} className="autocompleteList">
      { (autocompleteOptions) ? autocompleteOptions.map((value, iteration) =>
        <div className="autocompleteItem" key={iteration} onClick={() => props.selectSymbol(value['1. symbol'])}>
          <p>{value['1. symbol']}</p>
        </div>
      ) : null }
    </div>
  );
}

export default AutocompleteList;
