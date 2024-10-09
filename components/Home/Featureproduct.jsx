import React from "react";
import useData from "../../hooks/useData";
import Productcardskeleton from "../Products/Productcardskeleton";
import Productcard from "../Products/Productcard";

const Featureproduct = () => {
  const { data, error, isLoading } = useData("/products/featured");
  const skeletons = [1, 2, 3];
  return (
    <>
      <h2 className="text-center text-4xl font-semibold my-12">
        Featured Products
      </h2>
      <div className="grid grid-cols-3 xl:max-w-[65%] gap-20 container mx-auto">
        {error && <em className="text-red-700">{error}</em>}
        {isLoading && skeletons.map((n) => <Productcardskeleton key={n} />)}
        {data &&
          data.map((product) => (
            <Productcard key={product._id} product={product} />
          ))}
      </div>
    </>
  );
};

export default Featureproduct;
