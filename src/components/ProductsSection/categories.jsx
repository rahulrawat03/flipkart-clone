import React from "react";
import "./categories.css";
import Category from "./category";

const categories = [
  { categoryClass: "category__offers", name: "top offers" },
  { categoryClass: "category__grocery", name: "grocery" },
  { categoryClass: "category__mobiles", name: "mobiles" },
  { categoryClass: "category__fashion", name: "fashion" },
  { categoryClass: "category__electronics", name: "electronics" },
  { categoryClass: "category__appliances", name: "appliances" },
];

function Categories() {
  return (
    <section className="categories-container">
      <section className="categories">
        {categories.map((category, index) => (
          <Category key={index} {...category} />
        ))}
      </section>
    </section>
  );
}

export default Categories;
