import React, { useEffect, useState, useContext } from "react";
import UserContext from "../../contexts/UserContext";
import usericon from "../../assets/user.webp";
import Table from "../common/Table";
import Remove from "../../assets/remove.png";
import Quantityinput from "../singleproduct/Quantityinput";
import CartContext from "../../contexts/CartContext";
import { checkoutAPI } from "../../services/orderServices";
import { toast } from "react-toastify";

const Cartpage = () => {
  const [subTotal, setSubTotal] = useState(0);
  const user = useContext(UserContext);
  const { cart, removeFromCart, updateCart, setCart } = useContext(CartContext);
  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    setSubTotal(total);
  }, [cart]);
  const checkout = () => {
    const oldCart = [...cart];
    setCart([]);
    checkoutAPI()
      .then(() => {
        toast.success("Order placed successfully");
      })
      .catch(() => {
        toast.error("Something went wrong");
        setCart(oldCart);
      });
  };
  return (
    <section className="container mx-auto px-4">
      <div className="flex justify-center my-10 gap-3">
        <img src={usericon} className="w-12 rounded-full" />
        <div>
          <p className="font-semibold">Name: {user?.name}</p>
          <p>Email: {user?.email}</p>
        </div>
      </div>
      <Table headings={["Item", "price", "Quantity", "Total", "Remove"]}>
        <tbody className="bg-white text-center">
          {cart.map(({ product, quantity }) => (
            <tr key={product._id}>
              <td className="border border-slate-300 p-1">{product.title}</td>
              <td className="border border-slate-300 p-1">{product.price}</td>
              <td className="border border-slate-300 p-1">
                <Quantityinput
                  quantity={quantity}
                  stock={product.stock}
                  setquantity={updateCart}
                  Cartpage={true}
                  productId={product._id}
                />
              </td>
              <td className="border border-slate-300 p-1">
                ${quantity * product.price}
              </td>
              <td className="border border-slate-300 p-1">
                <button>
                  <img
                    src={Remove}
                    className="w-7 m-auto"
                    onClick={() => removeFromCart(product._id)}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <table className="bg-white w-1/4 ml-auto border-separate border border-slate-400">
        <tbody>
          <tr>
            <td className="border border-slate-300 p-1">Subtotal</td>
            <td className="border border-slate-300 p-1">${subTotal}</td>
          </tr>
          <tr>
            <td className="border border-slate-300 p-1">Shipping</td>
            <td className="border border-slate-300 p-1">$5</td>
          </tr>
          <tr>
            <td className="border border-slate-300 p-1 font-semibold">Total</td>
            <td className="border border-slate-300 p-1 font-semibold">
              ${subTotal + 5}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="text-right mt-5">
        <button
          className="bg-[#6457f9] text-white py-1 px-3 rounded"
          onClick={checkout}
        >
          Checkout
        </button>
      </div>
    </section>
  );
};

export default Cartpage;
