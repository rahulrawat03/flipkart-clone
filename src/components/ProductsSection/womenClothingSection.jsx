import React from "react";
import CategorySection from "./categorySection";
import items from "../services/data";

function WomenClothing() {
  return (
    <CategorySection
      title="women clothing"
      products={items.filter((item) => item.category === "women's clothing")}
    />
  );
}

export default WomenClothing;
