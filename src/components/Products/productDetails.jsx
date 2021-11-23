import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaStar, FaTag, FaShoppingCart } from "react-icons/fa";
import { BsLightningFill } from "react-icons/bs";
import "./productDetails.css";
import items from "../services/data";
import { storeItems } from "../services/localStorageServices";
import { context } from "../services/globalContext";

const offers = [
  { type: "search price", desc: "Get extra 10% off" },
  {
    type: "bank offers",
    desc: "5% Unlimited cashback on Flipkart Axis Bank Credit Card",
  },
  {
    type: "bank offers",
    desc: "15% Instant discount on first pay letter of ₹500 and above",
  },
  {
    type: "bank offers",
    desc: "10% Off on first time ICICI Bank Mastercard Credit Card",
  },
];

function ProductDetails() {
  const { id } = useParams();
  const { image, title, description, rating, price } = items.find(
    (item) => item.id === parseInt(id)
  );
  const { user, totalProducts, setTotalProducts, handleAlert } =
    useContext(context);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCart = () => {
    if (!user.name) {
      handleAlert("You need to login first");
      return;
    }
    handleAlert("Added to cart");
    setTotalProducts(totalProducts + 1);
    storeItems(user.email, id);
  };

  return (
    <section className="product-details-container">
      <div className="product-details">
        <div className="product-details__image-container">
          <img src={image} alt={title} className="product-details__image" />
          <div className="shopping__buttons">
            <button className="btn btn--add-to-cart" onClick={handleAddToCart}>
              <FaShoppingCart className="icon--cart" />
              add to cart
            </button>
            <button
              className="btn btn--buy-now"
              onClick={() => handleAlert("Please add to cart")}
            >
              <BsLightningFill className="icon--lightening" />
              buy now
            </button>
          </div>
        </div>
        <div className="product-details__info">
          <h2 className="product-details__title">{title}</h2>
          <div className="product-details__rating">
            <span className="product-details__stars">
              {rating.rate}
              <FaStar className="icon--star" />
            </span>
            <span className="product-details__reviews">
              {rating.count} reviews
            </span>
          </div>
          <h2 className="product-details__price">₹{price}</h2>
          <ul className="product-details__offers">
            <h3>Available Offers</h3>
            {offers.map(({ type, desc }, index) => (
              <li key={index} className="product-details__offer">
                <FaTag className="icon--tag" />
                <h3 className="product-details__offer__title">{type}</h3>
                <span className="product-details__offer__desc">{desc}</span>
                <Link to="#" className="product-details__offer__terms">
                  T&C
                </Link>
              </li>
            ))}
          </ul>
          <p className="product-details__desc">{description}</p>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
