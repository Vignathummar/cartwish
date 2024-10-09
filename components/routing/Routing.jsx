import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "../../components/Home/Homepage";
import Productpage from "../../components/Products/Productpage";
import Singleproductpage from "../../components/singleproduct/Singleproductpage";
import Cartpage from "../../components/cart/Cartpage";
import Myorderpage from "../../components/myorder/Myorderpage";
import Loginpage from "../../components/authentication/Loginpage";
import Signuppage from "../../components/authentication/Signuppage";
import Logout from "../../components/authentication/Logout";
import ProtectedRoute from "./ProtectedRoute";
const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products" element={<Productpage />} />
        <Route path="/product/:id" element={<Singleproductpage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/signup" element={<Signuppage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<Cartpage />} />
          <Route path="/myorders" element={<Myorderpage />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
      </Routes>
    </>
  );
};
export default Routing;
