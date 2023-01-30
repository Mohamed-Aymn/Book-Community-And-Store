import packageInfo from "./package.json";

let baseUrl;
process.env.NODE_ENV !== "production"
    ? (baseUrl = "http://localhost:3000")
    : null;

export const env = {
    production: process.env.NODE_ENV === "production",
    BASE_URL: baseUrl,
    VERSION: packageInfo.version,
};
