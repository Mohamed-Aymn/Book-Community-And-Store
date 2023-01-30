import packageInfo from "./package.json";

let baseUrl;
process.env.NODE_ENV === "development"
    ? (baseUrl = "http://localhost:3000")
    : process.env.NEXT_PUBLIC_DOMAIN;

export const env = {
    production: process.env.NODE_ENV === "production",
    BASE_URL: baseUrl,
    VERSION: packageInfo.version,
};
