import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import "./cartItem.css";
import { getCountOfItems } from "../services/localStorageServices";
import { getUser } from "../services/localStorageServices";

function CartItem({ product, onIncrement, onDecrement, onDelete }) {
  const { id, title, image } = product;
  const { email } = getUser();

  return (
    <li className="cart__item">
      <img src={image} alt={title} className="cart__item__image" />
      <div className="cart__item__info">
        <h3 className="cart__item__title">{title}</h3>
        <h3 className="cart__item__count">
          <button
            className="btn btn--increase-count"
            onClick={() => onIncrement(id)}
          >
            <FaPlus />
          </button>
          <span>{getCountOfItems(email, id)}</span>
          <button
            className="btn btn--decrease-count"
            onClick={() => onDecrement(id)}
          >
            <FaMinus />
          </button>
        </h3>
      </div>
      <button className="btn btn--delete-item" onClick={() => onDelete(id)}>
        <FaTrash className="icon--trash" />
      </button>
    </li>
  );
}

export default CartItem;
