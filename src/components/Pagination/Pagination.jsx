import React from "react";
import PropTypes from "prop-types";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handleClick = (page) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  return (
    <div className="flex justify-center">
      <nav className="inline-flex">
        <button
          className={`${
            isFirstPage ? "opacity-50 cursor-not-allowed" : ""
          } border border-gray-300 rounded-l-md px-4 py-2 bg-white text-gray-700 font-medium hover:bg-gray-50`}
          onClick={() => handleClick(currentPage - 1)}
          disabled={isFirstPage}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            className={`${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700"
            } border-t border-b border-gray-300 px-4 py-2 font-medium hover:bg-gray-50`}
            onClick={() => handleClick(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className={`${
            isLastPage ? "opacity-50 cursor-not-allowed" : ""
          } border border-gray-300 rounded-r-md px-4 py-2 bg-white text-gray-700 font-medium hover:bg-gray-50`}
          onClick={() => handleClick(currentPage + 1)}
          disabled={isLastPage}
        >
          Next
        </button>
      </nav>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
