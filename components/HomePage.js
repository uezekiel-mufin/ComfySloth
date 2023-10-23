import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Services from './Services';
import Newsletter from './Newsletter';
import Featured from './Featured';

const HomePage = () => {
	const [loading, setLoading] = useState(true);
	return (
		<div className='flex flex-col w-full '>
			<div className='flex md:px-16 xl:px-32  flex-col md:grid grid-cols-2 gap-16 mx-auto w-full p-8 pb-16'>
				<div className='flex flex-col justify-center items-start mt-12 '>
					<h1 className='text-[#102a42] font-bold mb-4'>
						Design Your <br /> Comfort Zone
					</h1>
					<h5 className='text-[#617d98] leading-5'>
						Explore our handpicked collection of furniture that transcends mere <br /> functionality. Let each piece resonate with your soul and transform <br /> your home into a haven of comfort and style. It's time to design your comfort zone."
					</h5>
					<Link href='/products'>
						<button className='bg-[#ab7a5f] transition-all duration-300 ease-linear hover:scale-105 hover:bg-[#cea792] text-white px-6 md:px-12 tracking-widest rounded-md py-3 mt-4 md:py-4'>Shop Now</button>
					</Link>
				</div>
				<article className='mt-12 hidden md:flex justify-end relative  self-end w-full'>
					<div className='relative after flex justify-end before:bg-[#decbc0]'>
						<Image src='/hero-bcg.jpeg' alt='hero-img' width={400} height={550} className={`${loading ? 'shimmer' : ''}`} onLoadingComplete={() => setLoading(false)} />
						<div className='absolute left-0 -translate-x-1/2 bottom-0 '>
							<Image src='/hero-bcg-2.jpeg' alt='hero-img' width={250} height={165} className={`${loading ? 'shimmer' : ''}`} onLoadingComplete={() => setLoading(false)} />
						</div>
					</div>
				</article>
			</div>
			<div data-aos='slide-up' data-aos-easing='ease-in-sine' data-aos-duration='500'>
				<Featured />
			</div>
			<div data-aos='slide-up' data-aos-easing='ease-in-sine' data-aos-duration='500'>
				<Services />
			</div>
			<div data-aos='slide-up' data-aos-easing='ease-in-sine' data-aos-duration='500'>
				<Newsletter />
			</div>
		</div>
	);
};

export default HomePage;
