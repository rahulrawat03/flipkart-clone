import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { context } from "../services/globalContext";
import "./cart.css";

function Cart({ expandToggler }) {
  const { user, totalProducts, handleAlert } = useContext(context);

  const handleClick = () => {
    if (!user.name) handleAlert("You need to login first");
    expandToggler(false);
  };

  return (
    <Link
      to={user.name ? "/cart" : "#"}
      className="btn btn--option btn--cart"
      onClick={handleClick}
    >
      <FaShoppingCart className="icon--shopping-cart" />
      <span>Cart</span>
      {user.name && <span className="items__count">{totalProducts}</span>}
    </Link>
  );
}

export default Cart;
