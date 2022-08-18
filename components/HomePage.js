import React from "react";
import Image from "next/image";
import Link from "next/link";
import Services from "./Services";
import Newsletter from "./Newsletter";

const HomePage = () => {
  return (
    <div className='flex flex-col'>
      <div className='flex flex-col md:grid grid-cols-2 gap-16 mx-auto w-11/12 p-8'>
        <div className='flex flex-col justify-center items-start mt-12 '>
          <h1 className='text-[#102a42] font-bold mb-4'>
            Design Your <br /> Comfort Zone
          </h1>
          <h5 className='text-[#617d98] leading-8'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, at
            sed omnis corporis doloremque possimus velit! Repudiandae nisi odit,
            aperiam odio ducimus, obcaecati libero et quia tempora excepturi
            quis alias?
          </h5>
          <Link href='/products'>
            <button className='bg-[#ab7a5f] text-white px-6 md:px-12 tracking-widest rounded-md py-2 mt-4 md:py-4'>
              Shop Now
            </button>
          </Link>
        </div>
        <article className=' hidden md:contents relative  self-end w-[400px]'>
          <div className='relative after before:bg-[#decbc0]'>
            <Image
              src='/hero-bcg.jpeg'
              alt='hero-img'
              width={400}
              height={550}
            />
            <div className='absolute left-0 -translate-x-1/2 bottom-0 '>
              <Image
                src='/hero-bcg-2.jpeg'
                alt='hero-img'
                width={250}
                height={165}
              />
            </div>
          </div>
        </article>
      </div>
      <div>now</div>
      <div>
        <Services />
      </div>
      <div>
        <Newsletter />
      </div>
    </div>
  );
};

export default HomePage;
