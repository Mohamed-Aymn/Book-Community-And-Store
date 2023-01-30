import { env } from "../environment";

export const getFreeBooks = async () => {
    return fetch(
        `https://${env.BASE_URL}/api/books?collection=free-ebooks`
    ).then(async (res) => {
        let data = await res.json();
        return data.data.items;
    });
};

export const getEbooks = async () => {
    return fetch(`https://${env.BASE_URL}/api/books?collection=ebooks`).then(
        async (res) => {
            let data = await res.json();
            return data.data.items;
        }
    );
};
