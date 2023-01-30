import packageInfo from "./package.json";

// let baseUrl;
// process.env.NODE_ENV === "production"
//     ? (baseUrl = process.env.VERCEL_URL)
//     : (baseUrl = "http://localhost:3000");

export const env = {
    production: process.env.NODE_ENV === "production",
    BASE_URL: process.env.VERCEL_URL,
    VERSION: packageInfo.version,
};
