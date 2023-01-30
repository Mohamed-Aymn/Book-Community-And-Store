import { env } from "../environment";

export const getSpecificBook = async (id: string) => {
    return await fetch(`${env.BASE_URL}/api/books/${id}`).then(async (res) => {
        let data = await res.json();
        return data.data;
    });
};
