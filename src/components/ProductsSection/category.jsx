import { useNavigate } from "react-router-dom";
import "./category.css";

function Category({ categoryClass, name }) {
  const navigate = useNavigate();

  return (
    <div
      className={`category ${categoryClass}`}
      onClick={() => navigate(`/products/${name}`)}
    >
      <div className="category__image">
        <img src="/images/sprite.png" alt={name} />
      </div>
      <strong className="category__name">{name}</strong>
    </div>
  );
}

export default Category;
