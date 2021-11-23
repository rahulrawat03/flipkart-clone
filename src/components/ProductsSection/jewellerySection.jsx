import React from "react";
import CategorySection from "./categorySection";
import items from "../services/data";

function Jewellery() {
  return (
    <CategorySection
      title="Jwellery"
      products={items.filter((item) => item.category === "jewelery")}
    />
  );
}

export default Jewellery;
