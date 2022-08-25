import React, { useState } from "react";
import { BiCheck, BiCircle } from "react-icons/bi";
import { categories } from "../utils/constants";
import { companies } from "../utils/constants";
import { colors } from "../utils/constants";
import { useSelector } from "react-redux";
import { RangeStepInput } from "react-range-step-input";
import { formatPrice } from "../utils/helpers";

const ProductFilters = () => {
  const products = useSelector((state) => state.productSlice.products);
  const [filterColor, setFilterColor] = useState("");
  const [filterPrice, setFilterPrice] = useState(0);

  //calculating the highest price in an array. extract the prices first and then reduce them using the resuce method
  const highestPrice =
    products.length > 1 &&
    products
      .map((product) => product.price)
      .reduce((acc, cur) => {
        if (cur > acc) return cur;
        if (acc > cur) return acc;
      }, 0);

  const handleFilterColor = (color) => {
    setFilterColor(color);
    console.log(filterColor);
  };

  console.log(products);
  return (
    <div className='flex flex-col gap-8'>
      <div>
        <input type='text' placeholder='search' />
      </div>
      <div>
        <h3>Category</h3>
        <ul>
          {categories.map((category, index) => (
            <li key={index}>{category}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Company</h3>
        <select name='company' id='company'>
          {companies.map((company, index) => (
            <option value={company} key={index}>
              {company}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h4>Colors</h4>
        <div className='flex gap-2 items-center'>
          <p className='flex items-center mb-0'>All</p>
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
                  }}
                />
              ) : (
                <BiCircle
                  style={{
                    background: color,
                    height: "1.5rem",
                    width: "1.5rem",
                    borderRadius: "50%",
                  }}
                />
              )}
            </span>
          ))}
        </div>
      </div>
      <div>
        <h4>Price</h4>
        <p>{formatPrice(filterPrice)}</p>
        <RangeStepInput
          min={0}
          max={highestPrice}
          value={filterPrice}
          step={1}
          onChange={(e) => setFilterPrice(e.target.value)}
        />
      </div>
      <div className='flex gap-4 items-center'>
        <h4>Free Shipping</h4>
        <input type='checkbox' />
      </div>
      <div>
        <button className='bg-[#ab7a5f] w-3/5 transition-all duration-300 ease-linear hover:scale-105 hover:bg-[#cea792] text-white capitalize px-2  tracking-widest rounded-md py-2 '>
          clear filters
        </button>
      </div>
    </div>
  );
};

export default ProductFilters;
