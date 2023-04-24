import React from "react";

import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import ReactPaginate from "react-paginate";


const PaginationButton = () => {
 
  return (
    <div

    >
      <ReactPaginate
        breakLabel={<span className="mt-4">...</span>}
        nextLabel={
          <span className="w-10 h-10 flex items-center justify-center bg-blue-200 rounded-md font-extrabold">
            <BsChevronRight />
          </span>
        }
        // onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={20}
        previousLabel={
          <span className="w-10 h-10 flex items-center justify-center bg-blue-200 rounded-md mr-4 ">
            <BsChevronLeft />
          </span>
        }
        pageClassName="block border- border-solid border-blue-300 hover:bg-blue-300 w-10 h-10 flex items-center justify-center rounded-md mr-4"
        renderOnZeroPageCount={null}
        containerClassName="flex items-center justify-center mt-8 "
        activeClassName="bg-blue-500 text-white"
      />
    </div>
  );
};

export default PaginationButton;
