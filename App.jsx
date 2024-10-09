import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar/Navbar";
import UserContext from "./contexts/UserContext";
import { BrowserRouter } from "react-router-dom";
import Routing from "./components/routing/Routing";
import setAuthToken from "./utils/setAuthToken";
import {
  addToCartAPI,
  decreaseProductAPI,
  getCartAPI,
  increaseProductAPI,
  removeFromCartAPI,
} from "../src/services/cartServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { getJwt, getUser } from "../src/services/userServices";
import CartContext from "./contexts/CartContext";

setAuthToken(getJwt());
const App = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    try {
      const jwtUser = getUser();
      if (Date.now() >= jwtUser.exp * 1000) {
        localStorage.removeItem("token");
        location.reload();
      } else {
        setUser(jwtUser);
      }
    } catch (err) {}
  }, []);

  const addToCart = (product, quantity) => {
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === product._id
    );
    if (productIndex === -1) {
      updatedCart.push({ product: product, quantity: quantity });
    } else {
      updatedCart[productIndex].quantity += quantity;
    }
    setCart(updatedCart);
    addToCartAPI(product._id, quantity)
      .then((res) => {
        toast.success("Product added Successfully");
      })
      .catch((err) => {
        toast.error("Failed to add product!");
        setCart(cart);
      });
  };
  const removeFromCart = (id) => {
    const oldCart = [...cart];
    const newCart = oldCart.filter((item) => item.product._id !== id);
    setCart(newCart);
    removeFromCartAPI(id).catch((err) => {
      toast.error("Somthing went wrong");
      setCart(oldCart);
    });
  };

  const updateCart = (type, id) => {
    const oldCart = [...cart];
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === id
    );
    if (type === "increase") {
      updatedCart[productIndex].quantity += 1;
      setCart(updatedCart);
      increaseProductAPI(id).catch((err) => {
        toast.error("Something went wrong!");
        setCart(oldCart);
      });
    }
    if (type === "decrease") {
      updatedCart[productIndex].quantity -= 1;
      setCart(updatedCart);
      decreaseProductAPI(id).catch((err) => {
        toast.error("Something went wrong!");
        setCart(oldCart);
      });
    }
  };

  const getCart = () => {
    getCartAPI()
      .then((res) => {
        setCart(res.data);
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      });
  };
  useEffect(() => {
    if (user) {
      getCart();
    }
  }, [user]);
  return (
    <>
      <UserContext.Provider value={user}>
        <CartContext.Provider
          value={{ cart, addToCart, removeFromCart, updateCart, setCart }}
        >
          <BrowserRouter>
            <Navbar />
            <main>
              <ToastContainer position="bottom-right" />
              <Routing />
            </main>
          </BrowserRouter>
        </CartContext.Provider>
      </UserContext.Provider>
    </>
  );
};

export default App;
