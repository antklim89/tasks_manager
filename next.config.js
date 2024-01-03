/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compress: true,
    images: {
        remotePatterns: [{
            hostname: new URL(process.env.URL || 'http://127.0.0.1').hostname,
        }],
    },
};

module.exports = nextConfig;
