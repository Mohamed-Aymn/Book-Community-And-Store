const getUserData = async (id: any) => {
    return await fetch(`http://localhost:3000/api/users/${id}`).then(
        async (res) => {
            let data = await res.json();
            return data.data;
        }
    );
};

export default getUserData;
