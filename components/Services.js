import React from 'react';
import { services } from '../utils/constants';

const Services = () => {
	return (
		<div className='bg-[#eaded7] py-28 pt-8 '>
			<div className='mx-8 md:mx-20 md:grid md:grid-cols-2 '>
				<h2 className='text-[#453227] font-bold flex items-center'>
					Custom Furniture <br /> Built Only For You
				</h2>
				<p
					className='my-8
        mb-12 leading-8 text-xl text-[#5f4435] '>
					With an extensive range of furniture options and expert design insights at your fingertips, your journey to create the perfect oasis begins here.
				</p>
			</div>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-16 md:gap-6 mt-8   md:px-32'>
				{services.map((service) => (
					<div key={service.id} className='bg-[#c5a491] hover:scale-105 duration-300 ease-linear shadow-lg py-6 px-8 flex justify-center flex-col text-center items-center gap-4 mx-8  md:mx-0 rounded-lg'>
						<div className='flex justify-center items-center rounded-full bg-[#eaded7] w-16 h-16 border  text-[#453227] '>
							<span className='text-3xl flex justify-center'>{service.icon}</span>
						</div>
						<h3 className='text-[#453227] font-semibold'>{service.title}</h3>
						<p className='leading-7 text-sm text-[#5f4435]'>{service.text}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Services;
