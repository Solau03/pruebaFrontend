import { useState } from "react";
import "../styles/Header.css";

const Search = ({ onSearch, onPriceFilter, onagotadoFilter, onbestFilter, ondispoFilter }) => {
  const [name, setName] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(name);
  };


  return (
    <div className="InputContainer">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search products"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
        />
      </form>

      <button
        className="micButton"
        aria-label="Toggle filter menu"
        onClick={() => setMenuVisible(!menuVisible)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="micIcon" viewBox="0 0 16 16">
          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
          <path d="M6 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
        </svg>

        {menuVisible && (
          <div className="micMenu">
            <ul>
              <li onClick={() => onPriceFilter({ min: 30.000, max: Infinity })}>
                Mayor a 30.000
              </li>
              <li onClick={() => onPriceFilter({ min: 0, max: 10.000 })}>
                Menor a 10.000
              </li>
              <li onClick={() => onbestFilter(true)}>Más vendidos</li>
              <li onClick={() => onagotadoFilter(false)}>Agotados</li>
              <li onClick={() => ondispoFilter(true)}>Disponibles</li>
            </ul>
          </div>
        )}
      </button>


    </div>
  );
};

export default Search;

