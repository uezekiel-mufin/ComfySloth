import React, { useEffect, useState, useRef } from "react";
import { BiCheck, BiCircle } from "react-icons/bi";
import { categories } from "../utils/constants";
import { companies } from "../utils/constants";
import { colors } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { FiFilter } from "react-icons/fi";
import {
  clearFilters,
  searchByFreeShipping,
  searchProducts,
  searchProductsByCategory,
  searchProductsByColor,
  searchProductsByCompany,
} from "../Slices/productSlice";

const ProductFilters = () => {
  const products = useSelector((state) => state.productSlice.filtered_products);
  const dispatch = useDispatch();
  const [filterColor, setFilterColor] = useState("");
  const [filterPrice, setFilterPrice] = useState(0);
  const [maxValue, setMaxValue] = useState(undefined);
  const [minValue, setMinValue] = useState(undefined);
  const [activeCategory, setActiveCategory] = useState(undefined);

  //calculating the highest price in an array. extract the prices first and then reduce them using the resuce method

  useEffect(() => {
    setFilterPrice(
      () =>
        products.length > 1 &&
        Math.max(...products.map((product) => product.price))
    );
  }, [products]);

  const handleFilterColor = (e, color) => {
    e.preventDefault();
    setFilterColor(color);
    const caller = color ? color : e.target.value;
    dispatch(searchProductsByColor(caller));
  };

  const handleSearchTerm = (e) => {
    dispatch(searchProducts(e.target.value));
  };

  const handleCategory = (e, category) => {
    e.preventDefault();
    dispatch(searchProductsByCategory(category));
  };

  const handleFilterByCompany = (e) => {
    e.preventDefault();

    const company = e.target.value;
    dispatch(searchProductsByCompany(company));
  };

  const handleClearFilters = (e) => {
    e.preventDefault();
    setFilterColor("");
    setActiveCategory("");
    dispatch(clearFilters());
  };

  const handleCategorySwitch = () => {
    const el = document.getElementById("category");
    el.classList.toggle("categoryDisplay");
  };

  const handleFilterShow = (e) => {
    e.preventDefault();
    const el = document.getElementById("filters");
    el.classList.toggle("filtersDisplay");
    el.classList.toggle("hidden");
  };

  return (
    <form className='flex flex-col gap-4 md:mb-24 mx-4 md:mx-0'>
      <div>
        <input
          type='text'
          placeholder='search'
          className='bg-[#f1f5f8] p-4 rounded-lg tracking-widest w-full text-xl'
          onChange={(e) => handleSearchTerm(e)}
          // onKeyUp={(e) => handleSearchTerm(e)}
        />
      </div>
      <div>
        <button
          className='bg-[] text-sm items-center flex  justify-start md:hidden bg-[#ab7a5f] p-2 px-4 text-white capitalize gap-1 transition-all duration-300 ease-linear hover:scale-110  rounded-lg'
          onClick={(e) => handleFilterShow(e)}
        >
          more filters{" "}
          <span className='text-sm flex justify-start'>
            <FiFilter />
          </span>
        </button>
      </div>
      <div className='hidden md:contents' id='filters'>
        <div>
          <div>
            <h4
              className='font-bold mb-4 text-lg cursor-pointer'
              onClick={(e) => handleCategorySwitch(e)}
            >
              Category
            </h4>
            <ul
              className='text-base transition-all duration-300 ease-linear'
              id='category'
            >
              {categories.map((category, index) => (
                <li
                  key={index}
                  className={`mb-2 text-lg tracking-widest font-normal ${
                    activeCategory === category
                      ? "bg-gray-300 rounded-lg p-1"
                      : ""
                  }`}
                  onClick={(e) => {
                    setActiveCategory(e.target.textContent);
                    handleCategory(e, category);
                  }}
                >
                  <button>{category}</button>
                </li>
              ))}
            </ul>
          </div>
          <div className='my-4'>
            <h4 className='font-bold mb-4 text-lg'>Company</h4>
            <select
              name='company'
              id='company'
              className='bg-[#f1f5f8] px-6 py-2 rounded-md lowercase text-xl'
              onChange={(e) => handleFilterByCompany(e)}
            >
              {companies.map((company, index) => (
                <option value={company} key={index} className=''>
                  {company}
                </option>
              ))}
            </select>
          </div>
          <div className='my-5'>
            <h4 className='font-bold text-lg '>Colors</h4>
            <div className='flex gap-2 items-center'>
              <button
                className='flex items-center mb-0 text-lg'
                onClick={(e) => handleFilterColor(e, "all")}
              >
                all
              </button>

              {colors.map((color) => (
                <button
                  key={color}
                  className={` flex justify-center rounded-full text-white  items-center `}
                  onClick={(e) => handleFilterColor(e, color)}
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
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className='font-bold text-sm md:text-lg mb-2'>
              choose a Price range
            </h4>

            <div className='flex w-full gap-4'>
              <div className='flex flex-col items-center'>
                <label htmlFor='min'>min</label>
                <input
                  id='min'
                  type='number'
                  onChange={(e) => {
                    setMinValue(+e.target.value);
                  }}
                  className='text-xl p-0 mt-1 w-16  h-6'
                />
              </div>
              <div className='flex flex-col items-center'>
                <label htmlFor='max'>max</label>
                <input
                  id='max'
                  type='number'
                  onChange={(e) => {
                    setMaxValue(+e.target.value);
                  }}
                  className='text-xl p-0 mt-1 w-16  h-6 '
                />
              </div>
            </div>
          </div>
          <div className='flex gap-4 items-end p-2'>
            <h4 className='font-bold mb-0 text-lg'>Free Shipping</h4>
            <input
              type='checkbox'
              className='h-5 w-5 flex items-end'
              value='free-shipping'
              onChange={(e) => {
                console.log(e.target.value);
                e.target.checked &&
                  dispatch(searchByFreeShipping(e.target.value));
                !e.target.checked &&
                  dispatch(searchByFreeShipping("not_checked"));
              }}
            />
          </div>
          <div>
            <button
              className='bg-[#ab7a5f]  transition-all duration-300 ease-linear hover:scale-105 hover:bg-[#cea792] text-white capitalize px-2  tracking-widest rounded-md py-2 '
              onClick={(e) => handleClearFilters(e)}
            >
              clear filters
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProductFilters;
