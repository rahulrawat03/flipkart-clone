import { useEffect } from "react";
import "./main.css";
import Categories from "./ProductsSection/categories";
import Banner from "./Banner/banner";
import GreatDeals from "./ProductsSection/greatDeals";
import MenClothing from "./ProductsSection/menClothingSection";
import WomenClothing from "./ProductsSection/womenClothingSection";
import Electronics from "./ProductsSection/electronicsSection";
import Jewellery from "./ProductsSection/jewellerySection";
import Footer from "./Footer/footer";

function FlipkartClone() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Categories />
      <Banner />
      <GreatDeals />
      <MenClothing />
      <WomenClothing />
      <Electronics />
      <Jewellery />
      <Footer />
    </>
  );
}

export default FlipkartClone;
