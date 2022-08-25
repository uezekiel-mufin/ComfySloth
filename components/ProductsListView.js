import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FcSearch } from "react-icons/fc";
import { useSelector, useDispatch } from "react-redux";
import { formatPrice } from "../utils/helpers";

const ProductsListView = () => {
  const products = useSelector((state) => state.productSlice.products);
  return (
    <div className='flex flex-col md:gap-16 md:px-8'>
      {products.map((product) => (
        <div
          key={product.id}
          className='flex flex-col md:grid grid-cols-2 gap-4 '
        >
          <div className='mx-2 my-4  relative flex flex-col '>
            <Image
              src={product.image}
              alt={product.name}
              layout='intrinsic'
              width='450px'
              height='300px'
              className='rounded-lg hover:brightness-50  transition-all duration-300 ease-linear'
            />
            <Link href={`/products/${product.id}`}>
              <a className='absolute top-0  right-0 flex justify-center transition-all duration-300 ease-linear items-center w-full h-full text-4xl opacity-5 hover:opacity-100 hover:bg-none '>
                <FcSearch />
              </a>
            </Link>
          </div>
          <div className='flex flex-col mx-2 gap-1 items-start justify-center'>
            <h3 className='text-[#102a42] font-bold text-5xl tracking-widest'>
              {product.name}
            </h3>
            <p className='tracking-widest flex items-center mb-0 text-[#b99179] text-2xl font-bold'>
              {formatPrice(product.price)}
            </p>
            <p className='mb-0 tracking-widest'>
              {`${product.description}`.substring(0, 300)}.....
            </p>
            <button className='bg-[#ab7a5f] transition-all duration-300 ease-linear hover:scale-105 hover:bg-[#cea792] text-white capitalize px-6 md:px-12 tracking-widest rounded-md py-2 mt-4 md:py-4'>
              Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsListView;
