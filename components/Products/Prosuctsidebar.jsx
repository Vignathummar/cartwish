import React from "react";
import Linkwithicon from "../navbar/Linkwithicon";
import useData from "../../hooks/useData";
import { NavLink } from "react-router-dom";
import categoryicon from "../../assets/categoryicon.png";

const Prosuctsidebar = () => {
  const { data: categories, error } = useData("/category");
  return (
    <aside className="lg:w-3/12 w-full p-5 ">
      <div className="bg-white lg:min-h-[87vh]">
        <h2 className="text-xl px-3 py-1 font-semibold my-3">Category</h2>
        <div className="px-3 pb-3">
          {error && <em className="text-red-700">{error}</em>}
          {categories &&
            categories.map((category) => (
              <Linkwithicon
                key={category._id}
                id={category.id}
                title={category.name}
                link={`/products?category=${category.name}`}
                emoji={`http://localhost:5000/category/${category.image}`}
                sidebar={true}
              />
            ))}
          <NavLink to="/products" className="px-3 my-2 gap-2 flex items-center">
            <img src={categoryicon} className="w-5" />
            See All Category
          </NavLink>
        </div>
      </div>
    </aside>
  );
};

export default Prosuctsidebar;
