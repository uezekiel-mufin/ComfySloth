import React from 'react';
import { GiCompass, GiDiamondHard, GiStabbedNote } from 'react-icons/gi';
import { BsGithub, BsGoogle } from 'react-icons/bs';
export const links = [
	{
		id: 1,
		text: 'home',
		url: '/',
	},
	{
		id: 2,
		text: 'about',
		url: '/about',
	},
	{
		id: 3,
		text: 'products',
		url: '/products',
	},
];

export const services = [
	{
		id: 1,
		icon: <GiCompass />,
		title: 'mission',
		text: 'We believe that true comfort extends beyond mere functionality, transcending into a realm of beauty and elegance. Our mission is to empower every home with an exquisite sense of comfort.',
	},
	{
		id: 2,
		icon: <GiDiamondHard />,
		title: 'vision',
		text: `We are committed to the idea that exceptional interior design isn't about sweeping transformations but about the subtle, thoughtful integration of pieces that bring a vision to life.`,
	},
	{
		id: 3,
		icon: <GiStabbedNote />,
		title: 'history',
		text: "Our journey began with a vision of creating furniture that resonates with the soul, and over the years, we've curated spaces where beauty meets functionality. ",
	},
];

export const categories = ['all', 'office', 'living room', 'kitchen', 'bedroom', 'dinning', 'kids'];
export const providers = [
	{
		name: 'github',
		icon: <BsGithub />,
	},

	{
		name: 'google',
		icon: <BsGoogle />,
	},
];

export const companies = ['all', 'marcos', 'liddy', 'ikea', 'caressa'];

export const colors = ['#ffb900', '#000', '#0000ff', '#ff0000', '#00ff00'];

export const products_url = 'https://course-api.com/react-store-products';

export const single_product_url = `https://course-api.com/react-store-single-product?id=`;
