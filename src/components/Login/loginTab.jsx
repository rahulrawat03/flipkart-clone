import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Joi from "joi-browser";
import { FaTimes } from "react-icons/fa";
import "./loginTab.css";
import {
  validateUser,
  getUserWithEmail,
  registerUser,
  setCurrentUser,
} from "../services/localStorageServices";
import { context } from "../services/globalContext";

function LoginTab({ handleLoginTabClose, isLogin, expandToggler }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(context);
  const [errors, setErrors] = useState(null);

  const schema = {
    email: Joi.string().email().label("Email"),
    password: Joi.string().required().label("Password"),
    name: Joi.string().required().label("Name"),
  };

  const handleChange = (e, input) => {
    const value = e.currentTarget.value;
    if (input === "email") setEmail(value);
    else if (input === "name") setName(value);
    else if (input === "password") setPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let result;
    const options = { abortEarly: false };

    if (isLogin) {
      result = Joi.validate(
        { email, password },
        { email: schema.email, password: schema.password },
        options
      );
    } else {
      result = Joi.validate({ email, password, name }, schema, options);
    }

    if (result.error) {
      setErrors(
        result.error.details.reduce((loginErrors, { message, path }) => {
          loginErrors[path[0]] = message;
          return loginErrors;
        }, {})
      );
    } else if (isLogin && !validateUser(email, password))
      setErrors({ login: "Invalid Email or Password" });
    else {
      let username;
      if (isLogin) {
        username = getUserWithEmail(email).name;
      } else {
        const userAlreadyRegistered = registerUser(email, name, password);
        if (userAlreadyRegistered) {
          setErrors({ login: "User already registered" });
          return;
        }
      }

      setErrors(null);
      setCurrentUser(email, username || name, password);
      setUser({ email, name: username || name, password });
      handleLoginTabClose();
      expandToggler(false);
    }
  };

  return (
    <section className="login-tab-container">
      <div className="login-tab">
        <aside className="login-banner">
          <h2 className="login-banner__title">
            {isLogin ? "Login" : "Register"}
          </h2>
          <p className="login-banner__desc">
            Get access to your Orders, Wishlist and Recommendations
          </p>
          <img src="/images/login.png" alt="login icon" />
        </aside>
        <div className="login-tab__body">
          <form className="login__form" onSubmit={handleSubmit}>
            <div className="login__input-group">
              <input
                type="email"
                className={
                  errors?.email
                    ? "login__email login__input--error"
                    : "login__email"
                }
                placeholder="Enter Email"
                onChange={(e) => handleChange(e, "email")}
                autoFocus
              />
              <div className="error__text">{errors?.email}</div>
            </div>
            {!isLogin && (
              <div className="login__input-group">
                <input
                  type="name"
                  className={
                    errors?.name
                      ? "login__name login__input--error"
                      : "login__name"
                  }
                  placeholder="Enter Name"
                  onChange={(e) => handleChange(e, "name")}
                />
                <div className="error__text">{errors?.name}</div>
              </div>
            )}
            <div className="login__input-group">
              <input
                type="password"
                className={
                  errors?.password
                    ? "login__password login__input--error"
                    : "login__password"
                }
                placeholder="Enter Password"
                onChange={(e) => handleChange(e, "password")}
              />
              <div className="error__text">{errors?.password}</div>
            </div>
            <div className="error__text">{errors?.login}</div>
            <p className="login__terms">
              By continuing, you agree to Flipkart's
              <Link to="#" className="login__terms--link">
                {" Terms of Use "}
              </Link>{" "}
              and
              <Link to="#" className="login__terms--link">
                {" Privacy Policy"}
              </Link>
              .
            </p>
            <button className="btn btn--login-submit">
              {isLogin ? "Login" : "Register"}
            </button>
          </form>
          <Link
            to="#"
            className="btn--register"
            onClick={() => handleLoginTabClose(!isLogin)}
          >
            {isLogin
              ? "New to Flipkart? Create an account"
              : "Existing User? Log in"}
          </Link>
        </div>
        <button
          className="btn btn--close-login"
          onClick={() => handleLoginTabClose()}
        >
          <FaTimes />
        </button>
      </div>
    </section>
  );
}

export default LoginTab;
