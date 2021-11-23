import { useState } from "react";
import { Link } from "react-router-dom";
import { isUndefined } from "lodash";
import { FaBars, FaTimes } from "react-icons/fa";
import "./header.css";
import SearchBar from "../Search/searchBar";
import Login from "../Login/login";
import More from "../More/more";
import Cart from "../Cart/cart";
import LoginTab from "../Login/loginTab";

function Header() {
  const [isTogglerExpanded, expandToggler] = useState(false);
  const [isLoginOpened, openLogin] = useState(false);
  const [isLoginNotRegister, setLoginNotRegister] = useState(true);

  const handleLoginTabOpen = (isLogin) => {
    if (!isLogin) setLoginNotRegister(false);
    else setLoginNotRegister(true);
    openLogin(true);
  };

  const handleLoginTabClose = (isLogin) => {
    if (isUndefined(isLogin)) {
      openLogin(false);
    } else setLoginNotRegister(isLogin);
  };

  return (
    <nav className="nav-container">
      <div className="header">
        <Link to="/" className="flipkart__logo">
          <img src="/images/sprite.png" alt="go to home" />
        </Link>
        <SearchBar />
        <button
          className="btn btn--toggler"
          onClick={() => expandToggler(true)}
        >
          <FaBars />
        </button>
        <section
          className={
            isTogglerExpanded ? "menu__options expanded" : "menu__options"
          }
        >
          <Login
            handleLoginTabOpen={handleLoginTabOpen}
            expandToggler={expandToggler}
          />
          <More />
          <Cart expandToggler={expandToggler} />
          <button
            className="btn btn--close"
            onClick={() => expandToggler(false)}
          >
            <FaTimes />
          </button>
        </section>
      </div>
      {isLoginOpened && (
        <LoginTab
          handleLoginTabClose={handleLoginTabClose}
          isLogin={isLoginNotRegister}
          expandToggler={expandToggler}
        />
      )}
    </nav>
  );
}

export default Header;
