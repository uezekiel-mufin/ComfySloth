import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { featuredProducts } from '../Slices/productSlice';
import { Circles } from 'react-loader-spinner';
import Image from 'next/image';
import { FcSearch } from 'react-icons/fc';
import Link from 'next/link';
import { formatPrice } from '../utils/helpers';
import { useEffect } from 'react';

const Featured = () => {
	const dispatch = useDispatch();
	const error = useSelector((state) => state.productSlice.products_error);
	const featured = useSelector((state) => state.productSlice.featured_products);
	const featured_loading = useSelector((state) => state.productSlice.featured_products_loading);

	console.log(featured);

	useEffect(() => {
		dispatch(featuredProducts());
	}, [dispatch]);

	return (
		<div className='bg-[#f1f5f8] px-12 py-12 flex flex-col '>
			<div className='flex justify-center flex-col items-center mb-8'>
				<h2 className='capitalize font-bold'>featured products</h2>
				<div className='h-1 mt-2 w-24 bg-[#ab7a5f]' />
			</div>

			<div>
				{featured_loading && (
					<div className='w-full  flex justify-center items-center   '>
						<Circles height='80' width='80' color='#cea792' ariaLabel='circles-loading' wrapperStyle={{}} wrapperClass='' visible={true} />
					</div>
				)}
				{error && <h4>There was an error......</h4>}
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:justify-items-stretch gap-2 md:gap-4 lg:px-16'>
					{featured.slice(0, 3).map((item) => (
						<div key={item.id} className=' my-2 md:my-8 relative flex flex-col justify-center'>
							<Image src='https://images.unsplash.com/photo-1618221710640-c0eaaa2adb49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZnVybml0dXJlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60' alt={item.name} layout='intrinsic' width='395px' height='200px' className='rounded-lg hover:brightness-50  transition-all duration-300 ease-linear' />
							{/* <Image src={item.images[0].url} alt={item.name} layout='intrinsic' width='395px' height='200px' className='rounded-lg hover:brightness-50  transition-all duration-300 ease-linear' /> */}

							<Link href={`/products/${item.id}`}>
								<a className='absolute top-0  right-0 flex justify-center transition-all duration-300 ease-linear items-center w-full h-full text-4xl opacity-5 hover:opacity-100 hover:bg-none '>
									<FcSearch />
								</a>
							</Link>

							<div className='flex justify-between mt-6 '>
								<p className='text-xl capitalize '>{item.name}</p>
								<p className='text-[#ab7a5f]'>{formatPrice(item.price)}</p>
							</div>
						</div>
					))}
				</div>

				<div className='flex justify-center'>
					<Link href='/products'>
						<button className='bg-[#ab7a5f] capitalize text-white px-6 md:px-12 transition-all duration-300 ease-linear hover:scale-105 hover:bg-[#cea792] tracking-widest rounded-md py-3 mt-4 md:py-4'>all products</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Featured;
