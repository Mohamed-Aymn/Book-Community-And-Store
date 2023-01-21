export const getSpecificBook = async (id: string) => {
    return await fetch(`http://localhost:3000/api/books/${id}`).then(
        async (res) => {
            let data = await res.json();
            return data.data;
        }
    );
};
