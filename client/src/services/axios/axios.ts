import a from "axios";

const axios = a.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + "/api/v1",
    withCredentials: true,
});

export default axios;