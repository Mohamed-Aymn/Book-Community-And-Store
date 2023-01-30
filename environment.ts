import packageInfo from "./package.json";

let baseUrl;
process.env.NODE_ENV === "production"
    ? (baseUrl = process.env.NEXT_PUBLIC_BASE_URL)
    : (baseUrl = "http://localhost:3000");

export const env = {
    production: process.env.NODE_ENV === "production",
    BASE_URL: baseUrl,
    VERSION: packageInfo.version,
};
