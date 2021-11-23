import React, { useState, useCallback, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import _ from "lodash";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./searchResult.css";
import SearchProduct from "./searchProduct";
import items from "../services/data";

const searches = {
  mobiles: "electronics",
  mobile: "electronics",
  laptop: "electronics",
  laptops: "electronics",
  watches: "electronics",
  tv: "electronics",
  electronics: "electronics",
  "t shirts": "men's clothing",
  shoes: "men's clothing",
  men: "men's clothing",
  "men clothing": "men's clothing",
  man: "men's clothing",
  women: "women's clothing",
  "women clothing": "women's clothing",
  woman: "women's clothing",
  sarees: "women's clothing",
  jewellery: "jewelery",
  jewelleries: "jewelery",
};

const sortOrders = [
  { name: "price", column: "price" },
  { name: "popularity", column: "rating.count" },
  { name: "rating", column: "rating.rate" },
];

function SearchResult() {
  const { state } = useLocation();
  const { query } = useParams();
  const search = state?.search || query;
  const [currentSortOrder, setCurrentSortOrder] = useState({
    column: sortOrders[0].column,
    ascending: true,
  });

  const getProducts = useCallback(() => {
    let products;
    if (state?.categoryItems) products = state?.categoryItems;
    else
      products = searches[search]
        ? items.filter((item) => item.category === searches[search])
        : [...items];

    products = _.orderBy(
      products,
      currentSortOrder.column,
      currentSortOrder.ascending ? "asc" : "desc"
    );

    return products;
  }, [search, currentSortOrder, state]);

  const products = getProducts();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSort = (sortOrder) => {
    const { column, ascending } = currentSortOrder;
    if (column === sortOrder)
      setCurrentSortOrder({ column: sortOrder, ascending: !ascending });
    else setCurrentSortOrder({ column: sortOrder, ascending: true });
  };

  const getTitle = () => {
    if (state?.title) return state?.title.toUpperCase();

    if (state)
      return items.length === products.length
        ? `Could not find anything related to "${search}". Showing all the available products instead.`
        : `Showing ${products.length} results for "${search}".`;

    if (query) return query.toUpperCase();
  };

  return (
    <section className="searches">
      <header className="searches__header">
        <h2 className="searches__title">{getTitle()}</h2>
        <ul className="searches__orders">
          {sortOrders.map((sortOrder, index) => (
            <li key={index} className="searches__order">
              <button
                className={
                  currentSortOrder.column === sortOrder.column
                    ? "btn btn--sort-order btn--sort-order--active"
                    : "btn btn--sort-order"
                }
                onClick={() => handleSort(sortOrder.column)}
              >
                {sortOrder.name}
                {currentSortOrder.column === sortOrder.column &&
                !currentSortOrder.ascending ? (
                  <FaChevronUp className="icon--sort" />
                ) : (
                  <FaChevronDown className="icon--sort" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </header>
      {products.map((product) => (
        <SearchProduct key={product.id} product={product} />
      ))}
    </section>
  );
}

export default SearchResult;
