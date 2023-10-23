import React from 'react';
import HeroSection from '../components/HeroSection';
import Layout from '../components/Layout';
import Image from 'next/image';

const About = () => {
	return (
		<Layout title='about'>
			<HeroSection title='About' />
			<section className='grid grid-cols-1 md:grid-cols-2 p-2 md:p-20'>
				<article className='w-full h-full p-8 '>
					<Image src='/hero-bcg.jpeg' alt='about' height='100px' width='100px' layout='responsive' className='rounded-lg' />
				</article>

				<article className='p-8 '>
					<h2 className='capitalize font-bold'>our story</h2>
					<div className='h-1 mt-2 w-24 bg-[#ab7a5f]' />
					<p className='text-base mt-8 leading-8 text-[#617d98]'>
						About Us At ComfySloth, we are on a mission to enrich homes with quality comfort and timeless style. Our vision is simple yet powerful: to transform living spaces, one piece at a time. We believe that every home has the potential to be extraordinary, and it's our commitment to help you achieve that vision. Our vision is to create living spaces that inspire and rejuvenate. We believe that exceptional interior design isn't about grand transformations, but rather about the thoughtful
						integration of pieces that bring your vision to life. Each piece of furniture is like a brushstroke on the canvas of your space, and we are here to help you craft the perfect masterpiece. Our journey began in 2005 with a profound idea: to provide homes with furniture that embodies quality craftsmanship, unparalleled comfort, and enduring style. Thank you for being a part of our journey, and we can't wait to help you create the home of your dreams.
					</p>
				</article>
			</section>
		</Layout>
	);
};

export default About;
