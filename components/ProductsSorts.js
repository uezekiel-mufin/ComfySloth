import React from "react";
import { BsFillGridFill } from "react-icons/bs";

import { FaListUl } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  listView,
  gridView,
  sortByHighest,
  sortByLowest,
  sortByName,
  sortByReverseName,
} from "../Slices/productSlice";

const ProductsSorts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productSlice.filtered_products);
  const grid_view = useSelector((state) => state.productSlice.grid_view);
  const list_view = useSelector((state) => state.productSlice.list_view);

  const handleSort = (e) => {
    const target_value = e.target.value;
    if (target_value === "price-lowest") {
      dispatch(sortByLowest(products));
    }
    if (target_value === "price-highest") {
      dispatch(sortByHighest(products));
    }
    if (target_value === "name-a") {
      dispatch(sortByName());
    }
    if (target_value === "name-z") {
      dispatch(sortByReverseName());
    }
  };
  return (
    <div className='grid grid-cols-4 md:flex mb-8 md:mb-0  gap-2 md:flex-row px-4 md:p-2 '>
      <div className='flex justify-start items-center gap-2'>
        <button
          className={` ${
            grid_view && "viewActive"
          } md:h-9 h-6 text-md md:text-2xl w-7 md:w-9 flex justify-center items-center border border-solid border-gray-600 rounded-lg`}
          onClick={() => dispatch(gridView())}
        >
          <BsFillGridFill />
        </button>
        <button
          className={`${
            list_view && "viewActive"
          } md:h-9 h-6 text-md md:text-2xl w-7 md:w-9 flex justify-center items-center border border-solid border-gray-600 rounded-lg`}
          onClick={() => dispatch(listView())}
        >
          <FaListUl />
        </button>
      </div>
      <div className='col-span-3 md:col-span-1 md:flex items-center   '>
        <h4> {products.length} items found</h4>
      </div>

      <div className='col-span-4 md:col-span-1 md:flex flex-1 items-center my-4 md:my-0 md:mx-8'>
        <hr
          style={{
            borderTop: "0.2px solid #bcccdc",

            flexGrow: 1,
          }}
        />
      </div>
      <div className='col-span-4 md:col-span-1  flex gap-10 items-center  md:gap-4'>
        <h4 className='text-base'>Sort By</h4>
        <select
          name='sort'
          id='sort '
          className='capitalize text-sm p-2  text-md md:text-lg font-semibold focus:border-none'
          onChange={(e) => handleSort(e)}
        >
          <option value='price-lowest'>price&nbsp;(Lowest)</option>
          <option value='price-highest'>price&nbsp;(Highest)</option>
          <option value='name-a'>Name&nbsp;(A-Z)</option>
          <option value='name-z'>Name&nbsp;(Z-A)</option>
        </select>
      </div>
    </div>
  );
};

export default ProductsSorts;
