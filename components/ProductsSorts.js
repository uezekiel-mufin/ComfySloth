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

  console.log(products);
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
    <div className='flex flex-col gap-2 md:flex-row px-4 md:p-2 '>
      <div className='flex items-center gap-2'>
        <button
          className={` ${
            grid_view && "viewActive"
          } h-9 text-2xl w-9 flex justify-center items-center border border-solid border-gray-600 rounded-lg`}
          onClick={() => dispatch(gridView())}
        >
          <BsFillGridFill />
        </button>
        <button
          className={`${
            list_view && "viewActive"
          } h-9 text-2xl  w-9 flex justify-center items-center border border-solid border-gray-600 rounded-lg`}
          onClick={() => dispatch(listView())}
        >
          <FaListUl />
        </button>
      </div>
      <div className='flex items-center '>
        <h4> {products.length} items found</h4>
      </div>

      <div className=' flex flex-1 items-center md:mx-8'>
        <hr
          style={{
            borderTop: "0.2px solid #bcccdc",

            flexGrow: 1,
          }}
        />
      </div>
      <div className=' flex items-center gap-2 md:gap-4'>
        <h4>Sort By</h4>
        <select
          name='sort'
          id='sort '
          className='capitalize text-base md:text-2xl font-semibold focus:border-none'
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
