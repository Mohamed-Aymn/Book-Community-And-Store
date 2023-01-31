import packageInfo from "./package.json";

// const vercel_public_domain = process.env.NEXT_PUBLIC_DOMAIN;

// const node_prod_env = process.env.NODE_ENV === "production";

// if Vercel prod deployment, then use main domain; else use temporary domain unless you're on dev
// export const DOMAIN = vercel_public_domain
//     ? vercel_public_domain
//     : node_prod_env
//     ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
//     : "http://127.0.0.1:3000";

// export const DOMAIN = process.env.NODE_ENV === "production"
//     ? process.env.NEXT_PUBLIC_VERCEL_URL
//     : process.env.NODE_ENV === "production"
//     ? `https://local`
//     : "test";

export const DOMAIN =
    process.env.NODE_ENV === "production"
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
        : "http://localhost:3000";

let baseUrl;
process.env.NODE_ENV === "development"
    ? (baseUrl = "http://localhost:3000")
    : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

export const env = {
    production: process.env.NODE_ENV === "production",
    BASE_URL: baseUrl,
    VERSION: packageInfo.version,
};
