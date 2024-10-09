import React from "react";

const Quantityinput = ({
  quantity,
  setquantity,
  stock,
  Cartpage,
  productId,
}) => {
  return (
    <>
      <div className="inline-block my-2">
        <button
          className="bg-[#ff8848] w-6 rounded-full text-white disabled:opacity-50 "
          disabled={quantity <= 1}
          onClick={() => {
            Cartpage
              ? setquantity("decrease", productId)
              : setquantity(quantity - 1);
          }}
        >
          -
        </button>
        <p className="w-14 text-center inline mx-6">{quantity}</p>
        <button
          className="bg-[#ff8848] w-6 rounded-full text-white disabled:opacity-50"
          onClick={() => {
            Cartpage
              ? setquantity("increase", productId)
              : setquantity(quantity + 1);
          }}
          disabled={quantity >= stock}
        >
          +
        </button>
      </div>
    </>
  );
};

export default Quantityinput;
