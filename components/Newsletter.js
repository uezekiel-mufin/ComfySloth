import React from 'react';

const Newsletter = () => {
	return (
		<div className='py-12 px-8 md:px-20 md:py-12 mx-4 flex flex-col gap-8'>
			<h3 className='text-[#102a42] font-bold  '>Join our newsletter and get 20% off</h3>
			<div className='grid grid-cols-1 md:grid-cols-2'>
				<p className='leading-7 text-base text-[#617d98] text-start pr-8'>Don't miss out on the latest updates, expert insights, and special offers from our world of home furnishing. Subscribe to our newsletter and be the first to discover the newest trends, decorating tips, and exclusive promotions.</p>
				<form className='w-full flex' action='https://formspree.io/f/mvoyonrw' method='POST'>
					<input name='email' placeholder='Enter Email' type='text' className='border-2 border-solid border-[#222] h-11 border-r-0 w-full p-4' />
					<button className='bg-[#ab7a5f] text-white py-2 h-11 px-4 border-2 border-solid border-[#222]'>Subscribe</button>
				</form>
			</div>
		</div>
	);
};

export default Newsletter;
