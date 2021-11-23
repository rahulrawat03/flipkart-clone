import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./searchBar.css";

const searchOptions = [
  "mobiles",
  "shoes",
  "t shirts",
  "laptops",
  "watches",
  "tv",
  "sarees",
];

function SearchBar() {
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputTag = useRef(null);
  const navigate = useNavigate();

  document.onclick = (e) => {
    e.target === inputTag.current
      ? setShowSuggestions(true)
      : setShowSuggestions(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search === "") {
      return;
    }
    navigate(`/search/${search}`, { state: { search } });
  };

  const handleSearchOptionClick = (searchOption) => {
    setSearch(searchOption);
    navigate(`/search/${searchOption}`, { state: { search: searchOption } });
  };

  return (
    <section className="search-bar">
      <form className="input-group">
        <input
          type="text"
          className="input__search"
          placeholder="Search for products, brand and more"
          value={search}
          ref={inputTag}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
        <button
          type="submit"
          className="btn btn--search"
          onClick={handleSubmit}
        >
          <FaSearch className="icon icon--search" />
        </button>
      </form>
      {showSuggestions && (
        <ul className="search__suggestions">
          <p className="search__suggestions__title">Discover More</p>
          {searchOptions.map((option, index) => (
            <li
              key={index}
              className="search__suggestion"
              onClick={(e) => handleSearchOptionClick(option)}
            >
              <FaSearch className="icon icon--suggestion" />
              {option}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default SearchBar;
