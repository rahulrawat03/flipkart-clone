import { useState } from "react";
import { IoMdWallet } from "react-icons/io";
import { FaBox, FaUserAlt, FaChevronRight } from "react-icons/fa";
import "./profileTab.css";
import { getUser } from "../services/localStorageServices";

const accountSettings = [
  "Profile Information",
  "Manage Addresses",
  "PAN Card Information",
];

const payments = ["Gift Cards", "Saved UPI", "Saved Cards"];

const getMenuTabHTML = (menuTab) => {
  const { name, email } = getUser();
  if (menuTab === accountSettings[0])
    return (
      <div>
        <h2 className="profile__menu__content__title">Name</h2>
        <p className="profile__menu__content__value">{name}</p>
        <h2 className="profile__menu__content__title">Email</h2>
        <p className="profile__menu__content__value">{email}</p>
      </div>
    );
  return <h2 className="profile__menu__content__title">{menuTab}</h2>;
};

function ProfileTab() {
  const [menuTab, setMenuTab] = useState(accountSettings[0]);

  return (
    <section className="profile">
      <aside className="profile__sidebar">
        <div className="profile__image">
          <img src="/images/profile.png" alt="profile" />
          <h2 className="profile__name">{getUser().name}</h2>
        </div>
        <div className="profile__menu">
          <div className="profile__menu__item profile__orders">
            <h2>
              <FaBox className="icon--profile" />
              my orders
              <FaChevronRight className="icon--profile__chevron" />
            </h2>
          </div>
          <div className="profile__menu__item profile__settings">
            <h2>
              <FaUserAlt className="icon--profile" />
              account settings
            </h2>
            <ul className="profile__menu__list">
              {accountSettings.map((option, index) => (
                <li
                  key={index}
                  className={
                    menuTab === option
                      ? "profile__menu__list__item profile__menu__list__item--active"
                      : "profile__menu__list__item"
                  }
                  onClick={() => setMenuTab(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
          <div className="profile__menu__item profile__payment-methods">
            <h2>
              <IoMdWallet className="icon--profile" />
              payments
            </h2>
            <ul className="profile__menu__list">
              {payments.map((option, index) => (
                <li
                  key={index}
                  className={
                    menuTab === option
                      ? "profile__menu__list__item profile__menu__list__item--active"
                      : "profile__menu__list__item"
                  }
                  onClick={() => setMenuTab(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
      <section className="profile__menu__content">
        {getMenuTabHTML(menuTab)}
      </section>
    </section>
  );
}

export default ProfileTab;
