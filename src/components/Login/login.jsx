import { useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { TiPlusOutline } from "react-icons/ti";
import { BsCreditCardFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { RiCoupon3Fill } from "react-icons/ri";
import { IoMdWallet } from "react-icons/io";
import Tooltip from "../Header/tooltip";
import "./login.css";
import { context } from "../services/globalContext";
import { removeUser } from "../services/localStorageServices";

const loginMenu = [
  { icon: CgProfile, title: "my profile", redirect: "/profile" },
  { icon: TiPlusOutline, title: "flipkart plus zone" },
  { icon: BsCreditCardFill, title: "orders" },
  { icon: FaHeart, title: "wishlist" },
  { icon: RiCoupon3Fill, title: "rewards" },
  { icon: IoMdWallet, title: "gift cards" },
];

function Login({ handleLoginTabOpen, expandToggler }) {
  const [expanded, setExpanded] = useState(false);
  const { user, setUser } = useContext(context);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (user.name) navigate("/profile");
    else handleLoginTabOpen(true);
  };

  const handleLogout = useCallback(() => {
    removeUser();
    setUser({});
    console.log("doing");
  }, [setUser]);

  const heading = user.name ? (
    <li className="btn--logout" onClick={handleLogout}>
      Logout
    </li>
  ) : (
    <li className="login__signup">
      New Customer?
      <button
        className="btn btn--signup"
        onClick={() => handleLoginTabOpen(false)}
      >
        sign up
      </button>
    </li>
  );

  return (
    <div
      className="login"
      onMouseOver={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <button className="btn btn--option btn--login" onClick={handleLogin}>
        {user.name?.toUpperCase() || "Login"}
      </button>
      <Tooltip
        heading={heading}
        menuItems={loginMenu}
        expanded={expanded}
        expandToggler={expandToggler}
      />
    </div>
  );
}

export default Login;
