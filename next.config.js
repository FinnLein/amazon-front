/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		SERVER_URL: process.env.SERVER_URL,
		APP_URL: process.env.APP_URL
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'loremflickr.com',
				port: '',
				pathname: '/**'
			},
			{
				protocol: 'https',
				hostname: 'www.aptronixindia.com',
				port: '',
				pathname: '/**'
			},
			{
				protocol: 'https',
				hostname: 'cloudflare-ipfs.com',
				port: '',
				pathname: '/**'
			},
		]
	}
}

module.exports = nextConfig
