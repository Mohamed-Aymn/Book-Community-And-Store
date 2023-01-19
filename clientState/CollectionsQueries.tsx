export const getFreeBooks = async () => {
    return fetch("http://localhost:3000/api/books?collection=free-ebooks").then(
        async (res) => {
            let data = await res.json();
            return data.data.items;
        }
    );
};

export const getEbooks = async () => {
    return fetch("http://localhost:3000/api/books?collection=ebooks").then(
        async (res) => {
            let data = await res.json();
            return data.data.items;
        }
    );
};
