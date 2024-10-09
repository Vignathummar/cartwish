import React from "react";
import { Link } from "react-router-dom";

const Herosection = ({ title, subtitle, link, image }) => {
  return (
    <section className="bg-black">
      <div className="flex items-center container mx-auto">
        <div className="text-white text-center w-5/12 lg:w-3/12 m-auto py-5">
          <h2 className="text-4xl font-semibold">{title}</h2>
          <p className="my-4">{subtitle}</p>
          <Link
            to={link}
            className="bg-white rounded-full text-black text-sm tracking-[1px] font-semibold inline-block px-7 py-3"
          >
            BUY NOW
          </Link>
        </div>
        <div className="w-5/12 ml-auto">
          <img
            src={image}
            className="scale-95 hover:scale-100 transition duration-500 cursor-pointer"
          />
        </div>
      </div>
    </section>
  );
};

export default Herosection;
