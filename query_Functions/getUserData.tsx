import { env } from "../environment";

const getUserData = async (id: any) => {
    return await fetch(`${env.BASE_URL}/api/users/${id}`).then(async (res) => {
        let data = await res.json();
        return data.data;
    });
};

export default getUserData;
