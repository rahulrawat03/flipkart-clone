import React from "react";
import CategorySection from "./categorySection";
import items from "../services/data";

function Electronics() {
  return (
    <CategorySection
      title="Electronics"
      products={items.filter((item) => item.category === "electronics")}
    />
  );
}

export default Electronics;
