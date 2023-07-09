/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compress: true,
    images: {
        domains: [
            '192.168.90.19',
            'localhost',
        ],
    },
};

module.exports = nextConfig;
