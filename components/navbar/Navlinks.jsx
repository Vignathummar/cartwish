import React from "react";
import { NavLink } from "react-router-dom";

const Navlinks = ({ title, links, emoji }) => {
  return (
    <NavLink
      to={links}
      className="gap-1 border-b-[1px] py-2 lg:border-b-[0] block lg:float-left lg:ml-3 xl:ml-6"
    >
      {title}
      <img src={emoji} className="xl:w-5 w-4 inline-block ml-1" />
    </NavLink>
  );
};

export default Navlinks;
