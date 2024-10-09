import React from "react";

const Pagination = ({ totalPosts, postPerPage, onClick, currentPage }) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pages.push(i);
  }
  return (
    <>
      {pages.length > 1 && (
        <ul className="flex justify-center mb-10 gap-2">
          {pages.map((page) => (
            <li>
              <button
                onClick={() => onClick(page)}
                className={
                  parseInt(currentPage) === page
                    ? "border bg-black border-black text-white w-10 h-10"
                    : "border bg-white border-gray-300 w-10 h-10"
                }
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Pagination;
