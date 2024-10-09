import React, { useContext, useState } from "react";
import Quantityinput from "./Quantityinput";
import { useParams } from "react-router-dom";
import useData from "../../hooks/useData";
import CartContext from "../../contexts/CartContext";
import UserContext from "../../contexts/UserContext";

const Singleproductpage = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setquantity] = useState(1);
  const { addToCart } = useContext(CartContext);
  const user = useContext(UserContext);
  const { data: product, error } = useData(`/products/${id}`);

  return (
    <section className="container mx-auto px-4 md:px-0">
      {error && <em className="text-red-700">{error}</em>}
      {product && (
        <div className="flex flex-col md:flex-row items-center my-10 gap-4 lg:gap-10">
          <div className="flex items-center gap-7 md:w-1/2">
            <div className="w-1/6">
              {product.images.map((image, index) => (
                <img
                  src={`http://localhost:5000/products/${image}`}
                  className={
                    selectedImage === index
                      ? "mb-3 rounded-lg cursor-pointer scale-110 duration-300 h-[7rem] w-[7rem] bg-white p-5"
                      : "mb-3 rounded-lg cursor-pointer h-[7rem] w-[7rem] bg-white p-5"
                  }
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
            <img
              src={`http://localhost:5000/products/${product.images[selectedImage]}`}
              className="rounded-lg w-5/6 h-[35rem] object-contain bg-white p-5"
            />
          </div>

          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold">{product.title}</h2>
            <p className="my-2">{product.description}</p>
            <p className="font-semibold">${product.price.toFixed(2)}</p>
            {user && (
              <>
                <h2>Quantity:</h2>
                <Quantityinput
                  quantity={quantity}
                  setquantity={setquantity}
                  stock={product.stock}
                />
                <div>
                  <button
                    className="bg-[#6457f9] text-white rounded py-1 px-3 "
                    onClick={() => addToCart(product, quantity)}
                  >
                    Add to cart
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Singleproductpage;
