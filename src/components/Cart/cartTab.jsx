import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./cartTab.css";
import items from "../services/data";
import CartItem from "./cartItem";
import {
  getItems,
  storeItems,
  removeOneUnit,
  removeAllUnits,
  getCountOfItems,
} from "../services/localStorageServices";
import { context } from "../services/globalContext";

function CartTab() {
  const [totalPrice, setPrice] = useState(0);
  const {
    user: { email },
    totalProducts,
    setTotalProducts,
    handleAlert,
  } = useContext(context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      navigate("/", { replace: true });
      return;
    }
    setPrice(
      getItems(email).reduce(
        (acc, { product, count }) => acc + product.price * count,
        0
      )
    );
    window.scrollTo(0, 0);
  }, [email, navigate]);

  const handleIncrement = (id) => {
    setTotalProducts(totalProducts + 1);
    setPrice(totalPrice + items[id - 1].price);
    storeItems(email, id);
  };

  const handleDecrement = (id) => {
    setTotalProducts(totalProducts - 1);
    setPrice(totalPrice - items[id - 1].price);
    removeOneUnit(email, id);
  };

  const handleDelete = (id) => {
    const totalItemOfThisType = getCountOfItems(email, id);
    setTotalProducts(totalProducts - totalItemOfThisType);
    setPrice(totalPrice - items[id - 1].price * totalItemOfThisType);
    removeAllUnits(email, id);
  };

  return (
    <section className="cart-tab">
      <h2 className="cart-tab__title">My Cart</h2>
      {totalPrice === 0 && (
        <div className="cart-empty">
          <img src="/images/cart.png" alt="empty cart" />
          <h3>Your cart is empty!</h3>
          <p>Add items to it now.</p>
          <Link to="/" className="btn btn--main">
            show now
          </Link>
        </div>
      )}
      {totalPrice > 0 && (
        <div className="cart__items-container">
          <ul className="cart__items">
            {getItems(email).map(({ product }) => (
              <CartItem
                key={product.id}
                product={product}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
                onDelete={handleDelete}
              />
            ))}
          </ul>
          <h2 className="cart__items__total">
            Total Amount
            <span>
              {" ₹"}
              {totalPrice}
            </span>
            <button
              className="btn btn--main btn--place-order"
              onClick={() => handleAlert("This is just a clone :)")}
            >
              place order
            </button>
          </h2>
        </div>
      )}
    </section>
  );
}

export default CartTab;
