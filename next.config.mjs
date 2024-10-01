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
				protocol: 'http',
				hostname: 'localhost',
				port: '4200',
				pathname: '/**'
			},
			{
				protocol: 'http',
				hostname: 'localhost',
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
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
				port: '',
				pathname: '/**'
			},
			{
				protocol: 'https',
				hostname: 'picsum.photos',
				port: '',
				pathname: '/**'
			},
			{
				protocol: 'https',
				hostname: 'upload.wikimedia.org',
				port: '',
				pathname: '/**'
			}
		]
	}
}

export default nextConfig
