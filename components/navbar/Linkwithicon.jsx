import React from "react";
import { NavLink } from "react-router-dom";

const Linkwithicon = ({ title, link, emoji, sidebar }) => {
  return (
    <NavLink
      to={link}
      className="flex gap-2 items-center flex-row-reverse justify-end w-full px-3 hover:bg-gray-100 py-2"
    >
      {title}
      <img src={emoji} className="w-5" />
    </NavLink>
  );
};

export default Linkwithicon;
