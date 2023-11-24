/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
	dest: 'public',
	register: true,
	skipWaiting: true,
	disable: process.env.NODE_ENV === 'development',
});

const nextConfig = withPWA({
	images: {
		domains: ['dl.airtable.com', 'images.unsplash.com', 'plus.unsplash.com'],
	},
	reactStrictMode: true,
});

module.exports = nextConfig;
