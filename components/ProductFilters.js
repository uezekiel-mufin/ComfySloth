import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BiCheck, BiCircle } from "react-icons/bi";
import { categories } from "../utils/constants";
import { companies } from "../utils/constants";
import { colors } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { RangeStepInput } from "react-range-step-input";
import { formatPrice } from "../utils/helpers";
import {
  fetchProducts,
  searchProducts,
  searchProductsByCategory,
} from "../Slices/productSlice";

const ProductFilters = () => {
  const products = useSelector((state) => state.productSlice.filtered_products);
  const dispatch = useDispatch();
  const [filterColor, setFilterColor] = useState("");

  //calculating the highest price in an array. extract the prices first and then reduce them using the resuce method
  const highestPrice =
    products.length > 1 &&
    products
      .map((product) => product.price)
      .reduce((acc, cur) => {
        if (cur > acc) return cur;
        if (acc > cur) return acc;
      }, 0);
  const [filterPrice, setFilterPrice] = useState(+highestPrice);

  const handleFilterColor = (color) => {
    setFilterColor(color);
    console.log(filterColor);
  };

  const handleSearchTerm = (e) => {
    console.log(e.target.value);
    dispatch(searchProducts(e.target.value));
  };

  const handleCategory = (e, category) => {
    e.preventDefault();
    console.log(category);
    dispatch(searchProductsByCategory(category));
  };

  // useEffect(() => {
  //   dispatch(fetchProducts());
  // }, [searchTerm]);
  return (
    <form className='flex flex-col gap-8 '>
      <div>
        <input
          type='text'
          placeholder='search'
          className='bg-[#f1f5f8] p-4 rounded-lg tracking-widest w-full text-xl'
          onChange={(e) => handleSearchTerm(e)}
        />
      </div>
      <div>
        <h4 className='font-bold mb-4'>Category</h4>
        <ul className='text-base '>
          {categories.map((category, index) => (
            <li
              key={index}
              className='mb-2 text-xl tracking-widest font-normal'
              onClick={(e) => handleCategory(e, category)}
            >
              <button className='capitalize'>{category}</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className='font-bold mb-4'>Company</h4>
        <select
          name='company'
          id='company'
          className='bg-[#f1f5f8] px-6 py-2 rounded-md lowercase text-xl'
        >
          {companies.map((company, index) => (
            <option value={company} key={index} className=''>
              {company}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h4 className='font-bold mb-4'>Colors</h4>
        <div className='flex gap-2 items-center'>
          <p className='flex items-center mb-0 text-2xl'>All</p>
          {colors.map((color) => (
            <span
              key={color}
              className={` flex justify-center rounded-full text-white  items-center `}
              onClick={() => handleFilterColor(color)}
            >
              {filterColor === color ? (
                <BiCheck
                  style={{
                    background: color,
                    height: "1.5rem",
                    width: "1.5rem",
                    borderRadius: "50%",
                    opacity: 1,
                  }}
                />
              ) : (
                <BiCircle
                  style={{
                    background: color,
                    height: "1.5rem",
                    width: "1.5rem",
                    borderRadius: "50%",
                    opacity: 0.6,
                  }}
                />
              )}
            </span>
          ))}
        </div>
      </div>
      <div>
        <h4 className='font-bold mb-4'>Price</h4>
        <p className='text-xl tracking-widest'>{formatPrice(filterPrice)}</p>
        <RangeStepInput
          min={0}
          max={highestPrice}
          value={filterPrice}
          step={1}
          onChange={(e) => setFilterPrice(e.target.value)}
          className='text-3xl'
        />
      </div>
      <div className='flex gap-4 items-end p-2'>
        <h4 className='font-bold mb-0 text-2xl'>Free Shipping</h4>
        <input type='checkbox' className='h-5 w-5 flex items-end' />
      </div>
      <div>
        <button className='bg-[#ab7a5f] w-3/5 transition-all duration-300 ease-linear hover:scale-105 hover:bg-[#cea792] text-white capitalize px-2  tracking-widest rounded-md py-2 '>
          clear filters
        </button>
      </div>
    </form>
  );
};

export default ProductFilters;
