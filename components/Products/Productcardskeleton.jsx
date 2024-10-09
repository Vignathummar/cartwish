import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Productcardskeleton = () => {
  return (
    <Skeleton className=" shadow-[0_10px_15px_-1px_rgba(0,0,0,0.1)] rounded-2xl mb-16 h-[360px]" />
  );
};

export default Productcardskeleton;
