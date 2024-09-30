/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites(){
        return [
            {
                destination: 'http://13.59.208.228/api/:path*',
                source: '/api/:path*'
            }
        ]
    }
};

export default nextConfig;
