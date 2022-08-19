import React, { useEffect, useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../Slices/productSlice";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Image from "next/image";
import { FcSearch } from "react-icons/fc";
import Link from "next/link";
import { formatPrice } from "../utils/helpers";

const responsiveSettings = [
  {
    breakpoint: 800,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 1,
    },
  },
  {
    breakpoint: 500,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 1,
    },
  },
];

const Featured = () => {
  const [search, setSearch] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.productSlice.products_loading);
  const error = useSelector((state) => state.productSlice.products_error);
  const featured = useSelector((state) => state.productSlice.featured_products);
  console.log(featured);
  console.log(loading);
  console.log(error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div className='bg-[#f1f5f8] px-12 py-12 flex flex-col '>
      <div className='flex justify-center flex-col items-center mb-8'>
        <h2 className='capitalize font-bold'>featured products</h2>
        <div className='h-1 mt-2 w-24 bg-[#ab7a5f]' />
      </div>

      <div>
        {loading && <h4>Loading......</h4>}
        {error && <h4>There was an error......</h4>}
        <div className='grid grid-cols-3'>
          {featured.slice(0, 3).map((item) => (
            <div key={item.id} className='w-5/6 h-4/6 my-8 relative'>
              <Image
                src={item.image}
                alt={item.name}
                layout='responsive'
                width='100px'
                height='100px'
                className='rounded-lg hover:brightness-50 transition-all duration-300 ease-linear'
              />

              <Link href={`products/${item.id}`}>
                <a className='absolute top-0  right-0 flex justify-center transition-all duration-300 ease-linear items-center w-full h-full text-4xl opacity-5 hover:opacity-100 hover:bg-none '>
                  <FcSearch />
                </a>
              </Link>

              <div className='flex justify-between mt-6'>
                <p className='text-xl capitalize '>{item.name}</p>
                <p className='text-[#ab7a5f]'>{formatPrice(item.price)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className='flex justify-center'>
          <button className='bg-[#ab7a5f] capitalize text-white px-6 md:px-12 transition-all duration-300 ease-linear hover:scale-105 hover:bg-[#cea792] tracking-widest rounded-md py-2 mt-4 md:py-4'>
            all products
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
