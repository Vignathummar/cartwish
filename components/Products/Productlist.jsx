import React, { useEffect, useState } from "react";
import Productcard from "./Productcard";
import useData from "../../hooks/useData";
import Pagination from "../common/Pagination";
import Productcardskeleton from "./Productcardskeleton";
import { useSearchParams } from "react-router-dom";

const Productlist = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [sortedProducts, setSortedProducts] = useState([]);
  const [search, setSearch] = useSearchParams();
  const category = search.get("category");
  const searchQuery = search.get("search");
  const { data, error, isLoading } = useData(
    "/products",
    {
      params: { category, page, search: searchQuery },
    },
    [searchQuery, category, page]
  );
  useEffect(() => {
    setPage(1);
  }, [searchQuery, category]);
  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8];
  const handlePageChange = (page) => {
    const currentParams = Object.fromEntries([...search]);
    setSearch({ ...currentParams, page: parseInt(currentParams.page) + 1 });
  };

  useEffect(() => {
    const handlescroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (
        scrollTop + clientHeight >= scrollHeight - 1 &&
        !isLoading &&
        data &&
        page < data.totalPages
      ) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handlescroll);
    return () => window.removeEventListener("scroll", handlescroll);
  }, [data, isLoading]);

  useEffect(() => {
    if (data && data.products) {
      const products = [...data.products];
      if (sortBy === "price desc") {
        setSortedProducts(products.sort((a, b) => b.price - a.price));
      } else if (sortBy === "price asc") {
        setSortedProducts(products.sort((a, b) => a.price - b.price));
      } else if (sortBy === "rate desc") {
        setSortedProducts(
          products.sort((a, b) => b.reviews.rate - a.reviews.rate)
        );
      } else if (sortBy === "rate asc") {
        setSortedProducts(
          products.sort((a, b) => a.reviews.rate - b.reviews.rate)
        );
      } else {
        setSortedProducts(products);
      }
    }
  }, [sortBy, data]);
  return (
    <section className="lg:w-9/12 w-full mt-5">
      <header className="flex justify-between mt-3 mb-6 px-10">
        <h2 className="text-2xl font-semibold">Products</h2>
        <select
          className="bg-white rounded px-1"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Relevance</option>
          <option value="price dese">Price HIGH to LOW</option>
          <option value="price asc">Price LOW to HIGH</option>
          <option value="rate dese">Rate HIGH to LOW</option>
          <option value="rate asc">Rate LOW to HIGH</option>
        </select>
      </header>
      <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-10 px-10">
        {error && <em className="text-red-700">{error}</em>}
        {data?.products &&
          sortedProducts.map((product) => (
            <Productcard key={product._id} product={product} />
          ))}
        {isLoading && skeleton.map((n) => <Productcardskeleton key={n} />)}
      </div>
      {/* {data && (
        <Pagination
          totalPosts={data.totalProducts}
          postPerPage={8}
          onClick={handlePageChange}
          currentPage={page}
        />
      )} */}
    </section>
  );
};

export default Productlist;
