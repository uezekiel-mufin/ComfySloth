import React from "react";
import { services } from "../utils/constants";

const Services = () => {
  return (
    <div className='bg-[#eaded7] py-8 '>
      <div className='mx-8 md:mx-20 my-8 md:grid md:grid-cols-2 '>
        <h2 className='text-[#453227] font-bold flex items-center'>
          Custom Furniture <br /> Built Only For You
        </h2>
        <p
          className='my-8
        mb-12 leading-8 text-xl text-[#5f4435] '
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe dolorum
          debitis consectetur reprehenderit non aliquam voluptates dolore aut
          vero consequuntur.
        </p>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-16 md:gap:8  xl:translate-y-1/4 md:px-24'>
        {services.map((service) => (
          <div
            key={service.id}
            className='bg-[#c5a491] py-10 px-8 flex justify-center flex-col text-center items-center gap-4 mx-8  md:mx-0 rounded-lg'
          >
            <div className='flex justify-center items-center rounded-full bg-[#eaded7] w-16 h-16 border  text-[#453227] '>
              <span className='text-4xl flex justify-center'>
                {service.icon}
              </span>
            </div>
            <h2 className='text-[#453227] font-semibold'>{service.title}</h2>
            <p className='leading-7 text-sm text-[#5f4435]'>{service.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
