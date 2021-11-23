import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./tooltip.css";
import { context } from "../services/globalContext";

function Tooltip({ heading, menuItems, expanded, expandToggler }) {
  const navigate = useNavigate();
  const { user, handleAlert } = useContext(context);

  const handleRedirect = (redirectLink) => {
    if (!redirectLink) {
      handleAlert("Option is not enabled yet");
      return;
    }
    if (!user.name) {
      handleAlert("You need to login first");
      return;
    }
    expandToggler(false);
    navigate(redirectLink);
  };

  return (
    <div
      className={expanded ? "tooltip-container" : "tooltip-container hidden"}
    >
      <ul className="tooltip">
        {heading}
        {menuItems.map(({ icon: Icon, title, redirect }, index) => (
          <li
            key={index}
            className="menu__item"
            onClick={() => handleRedirect(redirect)}
          >
            <Icon className="icon icon--tooltip" />
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tooltip;
