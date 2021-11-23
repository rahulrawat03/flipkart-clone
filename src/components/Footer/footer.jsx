import { FaShoppingBag, FaGift } from "react-icons/fa";
import { MdStars } from "react-icons/md";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import "./footer.css";

const footerLinks = [
  { Icon: FaShoppingBag, text: "sell on flipkart" },
  { Icon: MdStars, text: "advertise" },
  { Icon: FaGift, text: "gift cards" },
  { Icon: BsFillQuestionCircleFill, text: "help center" },
];

function Footer() {
  return (
    <footer className="footer">
      <ul className="footer__info">
        {footerLinks.map(({ Icon, text }, index) => (
          <li key={index} className="footer__link">
            <Icon className="icon--footer" />
            <h3 className="footer__text">{text}</h3>
          </li>
        ))}
        <li className="footer__note">&copy; Flipkart-Clone (Rahul)</li>
      </ul>
    </footer>
  );
}

export default Footer;
