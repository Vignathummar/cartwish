import React from "react";
import Prosuctsidebar from "./Prosuctsidebar";
import Productlist from "./Productlist";

const Productpage = () => {
  return (
    <section className="lg:flex lg:items-start">
      <Prosuctsidebar />
      <Productlist />
    </section>
  );
};

export default Productpage;
