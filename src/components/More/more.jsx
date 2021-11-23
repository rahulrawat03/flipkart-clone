import React, { useState } from "react";
import "./more.css";
import { FaChevronDown, FaChevronUp, FaBell, FaToolbox } from "react-icons/fa";
import { BsFillQuestionSquareFill, BsGraphUp } from "react-icons/bs";
import { IoMdDownload } from "react-icons/io";
import Tooltip from "../Header/tooltip";

const moreMenu = [
  { icon: FaBell, title: "notification preferences" },
  { icon: FaToolbox, title: "sell on flipkart" },
  { icon: BsFillQuestionSquareFill, title: "24×7 customer care" },
  { icon: BsGraphUp, title: "advertise" },
  { icon: IoMdDownload, title: "download app" },
];

function More() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className="more"
      onMouseOver={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <button
        className="btn btn--option btn--more"
        onClick={() => setExpanded(!expanded)}
      >
        More
        {expanded ? (
          <FaChevronUp className="icon--more" />
        ) : (
          <FaChevronDown className="icon--more" />
        )}
      </button>
      <Tooltip menuItems={moreMenu} expanded={expanded} />
    </div>
  );
}

export default More;
