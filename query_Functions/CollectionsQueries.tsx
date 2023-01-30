import { DOMAIN, env } from "../environment";

export const getFreeBooks = async () => {
    return fetch(`${DOMAIN}/api/books?collection=free-ebooks`).then(
        async (res) => {
            let data = await res.json();
            return data.data.items;
        }
    );
};

export const getEbooks = async () => {
    return fetch(`${DOMAIN}/api/books?collection=ebooks`).then(async (res) => {
        let data = await res.json();
        return data.data.items;
    });
};
