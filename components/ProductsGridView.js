import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FcSearch } from "react-icons/fc";
import { useSelector, useDispatch } from "react-redux";
import { formatPrice } from "../utils/helpers";
const ProductsGridView = () => {
  const products = useSelector((state) => state.productSlice.products);
  const loading = useSelector((state) => state.productSlice.products_loading);
  const error = useSelector((state) => state.productSlice.products_error);
  return (
    <div className='  py-2 flex flex-col '>
      <div>
        {loading && <h4>Loading......</h4>}
        {error && <h4>There was an error......</h4>}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:justify-items-stretch gap-2 md:gap-8 '>
          {products.map((item) => (
            <div key={item.id} className=' flex flex-col '>
              <div className='mx-2 my-4   relative flex flex-col '>
                <Image
                  src={item.image}
                  alt={item.name}
                  layout='intrinsic'
                  width='450px'
                  height='300px'
                  className='rounded-lg hover:brightness-50  transition-all duration-300 ease-linear'
                />

                <Link href={`/products/${item.id}`}>
                  <a className='absolute top-0  right-0 flex justify-center transition-all duration-300 ease-linear items-center w-full h-full text-4xl opacity-5 hover:opacity-100 hover:bg-none '>
                    <FcSearch />
                  </a>
                </Link>
              </div>

              <div className='flex justify-between mt-6 mx-2'>
                <p className='text-xl capitalize font-semibold '>{item.name}</p>
                <p className='text-[#ab7a5f] tracking-widest font-semibold'>
                  {formatPrice(item.price)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsGridView;
