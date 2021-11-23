import { useNavigate } from "react-router-dom";
import "./notFound.css";

function NotFound() {
  const navigate = useNavigate();

  return (
    <section className="not-found">
      <img
        src="/images/notFound.png"
        alt="error while visiting the link"
        className="not-found__image"
      />
      <h2 className="not-found__title">
        Unfortunately the page you have been looking for has been moved or
        deleted
      </h2>
      <button
        className="btn btn--main btn--go-to-home"
        onClick={() => navigate("/", { replace: true })}
      >
        go to homepage
      </button>
    </section>
  );
}

export default NotFound;
