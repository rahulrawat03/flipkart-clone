import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "./searchProduct.css";

function SearchProduct({ product }) {
  const { id, title, price, image, description, category, rating } = product;
  const navigate = useNavigate();

  return (
    <article
      className="search-product-container"
      onClick={() => navigate(`/products/${category}/${id}`)}
    >
      <div className="search-product">
        <img src={image} alt={title} className="search-product__image" />
        <div className="search-product__info">
          <h2 className="search-product__title">{title}</h2>
          <div className="search-product__rating">
            <span className="search-product__stars">
              {rating.rate}
              <FaStar className="icon--star" />
            </span>
            <span className="search-product__reviews">
              {rating.count} reviews
            </span>
          </div>
          <p className="search-product__desc">{description}</p>
        </div>
        <h2 className="search-product__price">₹{price}</h2>
      </div>
    </article>
  );
}

export default SearchProduct;
