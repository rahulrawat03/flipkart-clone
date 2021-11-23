import React, { useEffect, useRef, useState } from "react";
import { FaClock } from "react-icons/fa";
import "./greatDeals.css";
import items from "../services/data";
import CategorySection from "./categorySection";

function GreatDeals() {
  const [remainingTime, setRemainingTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const setTime = () => {
    const date = new Date();

    const future = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      23,
      59,
      59
    );

    let remainingMs = future - date;
    const msInHour = 60 * 60 * 1000;
    const hours = Math.floor(remainingMs / msInHour);

    remainingMs -= hours * msInHour;
    const msInMin = 60 * 1000;
    const minutes = Math.floor(remainingMs / msInMin);

    remainingMs -= minutes * msInMin;
    const msInSec = 1000;
    const seconds = Math.floor(remainingMs / msInSec);

    setRemainingTime({ hours, minutes, seconds });
  };

  const createTimer = () => {
    return (
      <span className="deals__timer">
        <FaClock className="icon--timer" />
        {`${remainingTime.hours} : ${remainingTime.minutes} : ${remainingTime.seconds} left`}
      </span>
    );
  };

  const timer = useRef(null);
  useEffect(() => {
    timer.current = setTimeout(() => {
      setTime();
    }, 1000);

    return () => {
      clearTimeout(timer.current);
      timer.current = null;
    };
  });

  return (
    <section className="deals-container">
      <CategorySection
        title="deals of the day"
        subTitle={createTimer()}
        products={[
          ...items.slice(1, 2),
          ...items.slice(6, 7),
          ...items.slice(11, 13),
          ...items.slice(14, 15),
          ...items.slice(3, 4),
          ...items.slice(19, 20),
        ]}
        putOffers
      />
      <aside className="advertisement">
        <img src="images/advertisement.png" alt="advertisement" />
      </aside>
    </section>
  );
}

export default GreatDeals;
