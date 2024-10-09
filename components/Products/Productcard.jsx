import React, { useContext } from "react";
import star from "../../assets/white-star.png";
import basket from "../../assets/basket.png";
import { NavLink } from "react-router-dom";
import CartContext from "../../contexts/CartContext";
import UserContext from "../../contexts/UserContext";

const Productcard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const user = useContext(UserContext);
  return (
    <>
      <article className="bg-white shadow-[0_10px_15px_-1px_rgba(0,0,0,0.1)] rounded-2xl mb-16">
        <div className="border-b-[1px] border-gray-300">
          <NavLink to={`/product/${product?._id}`}>
            <img
              src={`http://localhost:5000/products/${product?.images[0]}`}
              className="rounded-2xl w-5/6 m-auto h-60 py-5 object-contain"
            />
          </NavLink>
        </div>
        <div className="p-3">
          <h3 className="font-semibold">${product?.price}</h3>
          <p>{product?.title}</p>
          <footer className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <p className="bg-[#fca311] flex py-[1px] gap-2 text-white rounded px-2 mr-3 items-center text-sm">
                <img src={star} className="w-4" />
                {product?.reviews.rate}
              </p>
              <p className=" border-l-[1px] pl-3 border-gray-300 text-sm text-gray-500">
                {product?.reviews.counts}
              </p>
            </div>
            {product?.stock > 0 && user && (
              <button onClick={() => addToCart(product, 1)}>
                <img src={basket} className="w-8" />
              </button>
            )}
          </footer>
        </div>
      </article>
    </>
  );
};

export default Productcard;
