import React, { useContext, useEffect, useState } from "react";
import Navlinks from "./Navlinks";
import rocket from "../../assets/rocket.png";
import star from "../../assets/glowing-star.png";
import idbtn from "../../assets/id-button.png";
import memo from "../../assets/memo.png";
import order from "../../assets/package.png";
import lock from "../../assets/locked.png";
import iconmenu from "../../assets/menuicon.png";
import iconclose from "../../assets/close.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import CartContext from "../../contexts/CartContext";
import { getSuggestionsAPI } from "../../services/productServices";

const navbar = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(-1);
  const navigate = useNavigate();
  const [showlink, setShowlink] = useState(false);
  const user = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate(`/products?search=${search.trim()}`);
    }
    setSuggestions([]);
  };
  useEffect(() => {
    const delaySuggestion = setTimeout(() => {
      if (search.trim() !== "") {
        getSuggestionsAPI(search)
          .then((res) => setSuggestions(res.data))
          .catch((Err) => console.log(Err));
      } else {
        setSuggestions([]);
      }
    }, 3000);
    return () => clearTimeout(delaySuggestion);
  }, [search]);
  const handleKeyDown = (e) => {
    if (selectedItem < suggestions.length) {
      if (e.key === "ArrowDown") {
        setSelectedItem((current) =>
          current === suggestions.length - 1 ? 0 : current + 1
        );
      } else if (e.key === "ArrowUp") {
        setSelectedItem((current) =>
          current === 0 ? suggestions.length - 1 : current - 1
        );
      } else if (e.key === "Enter" && selectedItem > -1) {
        const suggestion = suggestions[selectedItem];
        navigate(`/products?search=${suggestion.title}`);
        setSearch("");
        setSuggestions([]);
      }
    } else {
      selectedItem(-1);
    }
  };
  return (
    <nav className="bg-white px-4">
      <div className="lg:flex lg:items-center lg:justify-between gap-3 xl:gap-10 py-5 container mx-auto">
        <div className="flex lg:items-center gap-3 xl:gap-6 flex-wrap lg:flex-nowrap">
          <h1 className="text-2xl font-semibold">CartWish</h1>
          <div className="ml-auto">
            <div className={showlink ? "hidden" : ""}>
              <img
                src={iconmenu}
                className="w-6 lg:hidden"
                onClick={() => setShowlink(!showlink)}
              />
            </div>
            <div className={showlink ? "" : "hidden"}>
              <img
                src={iconclose}
                className="w-6 lg:hidden"
                onClick={() => setShowlink(!showlink)}
              />
            </div>
          </div>
          <form className="w-full relative " onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search Products"
              className="border border-gray-300 p-1 w-full min-w-72"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              type="submit"
              className="bg-[#6457f9] border border-[#6457f9] text-white py-1 px-4 rounded-l-none rounded absolute right-0"
            >
              Search
            </button>
            {suggestions.length > 0 && (
              <ul className="border mt-1 p-2 z-50 absolute bg-white w-full max-h-60 overflow-y-auto">
                {suggestions.map((suggestions, index) => (
                  <li>
                    <Link
                      key={suggestions._id}
                      to={`/products?search=${suggestions.title}`}
                      className={
                        selectedItem === index
                          ? "block mb-2 hover:bg-gray-100 px-2 py-1 active:bg-slate-500"
                          : "block mb-2 hover:bg-gray-100 px-2 py-1"
                      }
                      onClick={() => {
                        setSearch("");
                        setSuggestions([]);
                      }}
                    >
                      {suggestions.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </form>
        </div>
        <div className={showlink ? "" : "hidden  lg:block mb-2"}>
          <Navlinks title="Home" links="/" emoji={rocket} />
          <Navlinks title="Products" links="/products" emoji={star} />
          {!user && (
            <>
              <Navlinks title="LogIn" links="/login" emoji={idbtn} />
              <Navlinks title="signUp" links="/signup" emoji={memo} />
            </>
          )}
          {user && (
            <>
              <Navlinks title="My Orders" links="/myorders" emoji={order} />
              <Navlinks title="Logout" links="/logout" emoji={lock} />
              <NavLink
                to="/cart"
                className="border-b-[1px] lg:border-b-[0]  py-2 block mb-2 lg:inline-block mb-2 lg:float-left lg:w-auto lg:ml-3 xl:ml-6 w-full"
              >
                Cart
                <p className="bg-[#6457f9] text-white rounded-full inline ml-1 px-1">
                  {cart.length}
                </p>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default navbar;
