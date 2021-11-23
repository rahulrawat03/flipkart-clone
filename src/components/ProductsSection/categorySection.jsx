import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./categorySection.css";
import Product from "../Products/product";

function CategorySection({ title, subTitle, products, putOffers }) {
  const [showButtons, setShowButtons] = useState(true);
  const [productsListLeft, setProductsListLeft] = useState(0);
  const productsListContainer = useRef(null);
  const productsList = useRef(null);
  const navigate = useNavigate();

  const getContainerProperties = () => {
    return productsListContainer.current?.getBoundingClientRect();
  };

  const getProductsListProperties = () => {
    return productsList.current?.getBoundingClientRect();
  };

  useEffect(() => {
    const { width, left } = getProductsListProperties();
    if (getContainerProperties().width >= width) setShowButtons(false);
    setProductsListLeft(left);
  }, [showButtons]);

  const setLeft = (rightPressed) => {
    if (rightPressed)
      setProductsListLeft(
        productsListLeft - getContainerProperties().width + 20
      );
    else
      setProductsListLeft(
        productsListLeft + getContainerProperties().width - 20
      );
  };

  const showingStart = () => {
    return productsListLeft > 0;
  };

  const showingEnd = () => {
    return (
      productsListLeft + getProductsListProperties()?.width <
      getContainerProperties()?.width + 30
    );
  };

  return (
    <article className="category-section" ref={productsListContainer}>
      <header className="category__header">
        <h2 className="category__title">{title}</h2>
        <span className="category__subtitle">{subTitle}</span>
        <button
          className="btn btn--main"
          onClick={() =>
            navigate(`/products/${title}`, {
              state: { title, categoryItems: products },
            })
          }
        >
          view all
        </button>
      </header>
      <div className="category__products-container">
        <div
          className="category__products"
          ref={productsList}
          style={{ left: productsListLeft }}
        >
          {products.map((product) => (
            <Product key={product.id} product={product} putOffers={putOffers} />
          ))}
        </div>
        {showButtons && !showingStart() && (
          <button className="btn btn--previous" onClick={() => setLeft(false)}>
            <FaChevronLeft />
          </button>
        )}
        {showButtons && !showingEnd() && (
          <button className="btn btn--next" onClick={() => setLeft(true)}>
            <FaChevronRight />
          </button>
        )}
      </div>
    </article>
  );
}

export default CategorySection;
