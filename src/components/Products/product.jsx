import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./product.css";

const offers = ["10% off", "20% off", "upto 80% off"];

function Product({ product, putOffers }) {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/products/${product.category}/${product.id}`);
  };

  return (
    <article className="product" onClick={handleProductClick}>
      <img src={product.image} alt={product.title} className="product__image" />
      <h3 className="product__title">{product.title.slice(0, 20) + "..."}</h3>
      {
        <p className="product__offer">
          {useMemo(
            () =>
              putOffers && offers[Math.floor(Math.random() * offers.length)],
            [putOffers]
          )}
        </p>
      }
      <p className="product__category">{product.category}</p>
    </article>
  );
}

export default Product;
