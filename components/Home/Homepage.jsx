import React from "react";
import iphone from "../../assets/iphone-14-pro.webp";
import Herosection from "./Herosection";
import mac from "../../assets/mac-system-cut.jfif";
import Featureproduct from "./Featureproduct";
import useData from "../../hooks/useData";
import { useSearchParams } from "react-router-dom";

const Homepage = () => {
  const [search, setSearch] = useSearchParams();
  const category = search.get("category");
  const { data, error, isLoading } = useData(
    "/products",
    {
      params: { category },
    },
    [category]
  );
  return (
    <>
      <Herosection
        title="Buy iphone 14 pro"
        subtitle="Experience the power of the latest iphone 14 with our most Pro camera ever"
        link="http://localhost:5173/product/66f24cff609737ca9c04fb3d"
        image={iphone}
      />
      <Featureproduct />

      <Herosection
        title="Build the ultimate setup"
        subtitle="you can add studio display and colour-matched magic accessories to your bag after configure your mac mini."
        link="/product/66f24cff609737ca9c04fb45"
        image={mac}
      />
    </>
  );
};

export default Homepage;
