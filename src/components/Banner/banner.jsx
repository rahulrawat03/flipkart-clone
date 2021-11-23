import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./banner.css";

const banners = [
  "images/banner1.jpg",
  "images/banner2.jpeg",
  "images/banner3.jpeg",
];

function Banner() {
  const [current, setCurrent] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    timer.current = setTimeout(() => {
      handleRight();
    }, 3000);

    return () => {
      clearTimeout(timer.current);
      timer.current = null;
    };
  });

  const getClasses = (index) => {
    if (index === current) return "banner__image current";
    if (index === (current === 0 ? banners.length - 1 : current - 1))
      return "banner__image left";
    return "banner__image right";
  };

  const handleLeft = () => {
    setCurrent(current === 0 ? banners.length - 1 : current - 1);
  };

  const handleRight = () => {
    setCurrent(current === banners.length - 1 ? 0 : current + 1);
  };

  return (
    <div className="banner">
      {banners.map((banner, index) => (
        <img
          src={banner}
          alt="offer banner"
          key={index}
          className={getClasses(index)}
        />
      ))}
      <button className="btn btn--previous" onClick={handleLeft}>
        <FaChevronLeft />
      </button>
      <button className="btn btn--next" onClick={handleRight}>
        <FaChevronRight />
      </button>
    </div>
  );
}

export default Banner;
