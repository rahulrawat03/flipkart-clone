import React from "react";
import CategorySection from "./categorySection";
import items from "../services/data";

function MenClothing() {
  return (
    <CategorySection
      title="Men Clothing"
      products={items.filter((item) => item.category === "men's clothing")}
    />
  );
}

export default MenClothing;
