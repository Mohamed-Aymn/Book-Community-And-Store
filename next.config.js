/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    optimizeFonts: true,
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "books.google.com",
            },
        ],
    },
};

module.exports = nextConfig;