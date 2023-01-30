/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    optimizeFonts: true,
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "books.google.com",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
            {
                protocol: "https",
                hostname: "platform-lookaside.fbsbx.com",
            },
        ],
    },
};

module.exports = nextConfig;
